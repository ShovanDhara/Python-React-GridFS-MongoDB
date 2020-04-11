import os
from pymongo import MongoClient

COLLECTION_NAME = 'RegistrationDB'


class MongoRepository(object):
    def __init__(self):
        mongo_url = os.environ.get('mongodb://localhost:27017/')
        self.db = MongoClient(mongo_url).RegistrationDB
        try:
            if MongoClient(mongo_url).get_database(COLLECTION_NAME):
                print(f"Connection Successful!...COLLECTION_NAME - {COLLECTION_NAME}")
        except Exception:
            print("Please check your connection")

    def find_all(self, collection_name):
        return self.db[collection_name].find({})

    def find(self, collection_name, selector):
        return self.db[collection_name].find_one(selector)

    def create(self, collection_name, data):
        return self.db[collection_name].insert_one(data)

    def update(self, collection_name, selector, updated_data):
        return self.db[collection_name].replace_one(selector, updated_data).modified_count

    def delete(self, collection_name, selector):
        return self.db[collection_name].delete_one(selector).deleted_count
