from configparser import ConfigParser
from Database_System.sqlite3_handler import SqliteSystem

class Database:

    def __init__(self):
        pass

    def start():
        config = ConfigParser()
        config.read('/home/imerit/yusuapp/backend/config.ini')
        if config['SELECTION']['database_type'] == 'sqlite3':
            SqliteSystem.start()
            Database.get_data = SqliteSystem.get_data
            Database.set_data = SqliteSystem.set_data
        else:
            print("\n[WARN] Developer must implement the tables for the database", flush=True)

    def get_data(key):
        print("\n[WARN] Developer must implement the fetch logic from table", flush=True)

    def set_data(key, value):
        print("\n[WARN] Developer must implement the insertion logic to table", flush=True)
