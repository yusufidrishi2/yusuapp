import sqlite3
import json
from configparser import ConfigParser

class SqliteSystem:

    def __init__(self):
        pass

    def start():
        config = ConfigParser()
        config.read('/home/imerit/yusuapp/backend/config.ini')

        # Connecting to the database file
        conn = sqlite3.connect(config['DATABASE']['sqlite_file'])
        c = conn.cursor()

        # Get the count of tables with the name
        c.execute('SELECT count(name) FROM sqlite_master\
                   WHERE type = "table" \
                   AND name = "{table}"'.format(table=config['DATABASE']['table_name']))

        #if the count is 1, then table exists
        if c.fetchone()[0] == 1:
            print('\n[INFO] Table already exists!', flush=True)
        else:
            # Creating a new SQLite table
            c.execute('CREATE TABLE {table} ({first_field} BLOB, {second_field} BLOB)'\
                       .format(
                        table=config['DATABASE']['table_name'],\
                        first_field=config['DATABASE']['first_field'],\
                        second_field=config['DATABASE']['second_field']
                        ))

        # Disconnecting to the database file
        conn.commit()
        conn.close()

    def get_data(key):
        config = ConfigParser()
        config.read('/home/imerit/yusuapp/backend/config.ini')

        # Connecting to the database file
        conn = sqlite3.connect(config['DATABASE']['sqlite_file'])
        c = conn.cursor()

        response = []
        
        if key == 'all':
            c.execute("SELECT * from {table}".format(table=config['DATABASE']['table_name']))
        else:
            pass

        all_chats = c.fetchall()
        for each_chat in all_chats:
            if len(each_chat) > 1:
                response.append({'userName': each_chat[0], 
                                 'userChats': json.loads(each_chat[1])})
        
        # Disconnecting to the database file
        conn.commit()
        conn.close()

        return response


    def set_data(key, value):
        config = ConfigParser()
        config.read('/home/imerit/yusuapp/backend/config.ini')

        # Connecting to the database file
        conn = sqlite3.connect(config['DATABASE']['sqlite_file'])
        c = conn.cursor()

        new_value = []

        c.execute("SELECT {req_field} FROM {table} WHERE {field} = {val}"\
                   .format(
                       req_field=config['DATABASE']['second_field'],
                       table=config['DATABASE']['table_name'],
                       field=config['DATABASE']['first_field'],
                       val=json.dumps(key)
                   ))
        
        all_chats = c.fetchall()

        if len(all_chats) > 0 and len(all_chats[0]) > 0:
            arr = json.loads(all_chats[0][0])
            for each_chat in arr:
                new_value.append(each_chat)
        new_value.append(value)

        c.execute("UPDATE {table} SET {field} = '{val}' WHERE {search_field} = {serch_value}"\
                .format(
                    table=config['DATABASE']['table_name'],
                    field=config['DATABASE']['second_field'],
                    val=json.dumps(new_value),
                    search_field=config['DATABASE']['first_field'],
                    serch_value=json.dumps(key)
                ))
        
        if c.rowcount == 0:
            c.execute("INSERT INTO {table} ({first_field}, {second_field}) VALUES ({val1}, '{val2}')"\
                    .format(
                        table=config['DATABASE']['table_name'],
                        first_field=config['DATABASE']['first_field'],
                        second_field=config['DATABASE']['second_field'],
                        val1=json.dumps(key),
                        val2=json.dumps(new_value)
                    ))
                        
        # Disconnecting to the database file
        conn.commit()
        conn.close()

        return None