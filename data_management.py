from Database_System.database_handler import Database

class DataManagement:

    def __init__(self):
        pass

    def logic(self, body):
        if not 'userChats' in body:
            response = Database.get_data(key=body['userName'])
        else:
            response = Database.set_data(key=body['userName'], value=body['userChats'])
        return response