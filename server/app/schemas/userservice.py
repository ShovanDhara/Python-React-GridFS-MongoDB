from server.app.dbfiles.basemethod import Repository
from server.app.dbfiles.mongo import MongoRepository


class UserService(object):
    def __init__(self, email='', repo_client=Repository(adapter=MongoRepository)):
        self.repo_client = repo_client
        self.email = email
        self.db_collection = 'users'

    def find_all_users(self):
        users = self.repo_client.find_all(self.db_collection)
        return users

    def find_user(self, query):
        user = self.repo_client.find(self.db_collection, query)
        return user

    def create_new_user(self, user_object):
        self.repo_client.create(self.db_collection, user_object)
        return user_object

    def delete_user(self, email):
        records_affected = self.repo_client.delete(self.db_collection, {'email': email})
        return records_affected > 0

    def update_user(self, email, obj):
        updated_user = self.repo_client.update(self.db_collection, {'email': email}, obj)
        return updated_user > 0


