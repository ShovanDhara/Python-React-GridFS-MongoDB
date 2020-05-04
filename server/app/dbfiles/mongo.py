import os
from pymongo import MongoClient
from gridfs import GridFS
from flask import json
from flask import make_response
from server.app.controller.error_handler import InvalidUsage

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

    def create_image(self, file_name, data):
        grid_fs = GridFS(self.db)
        grid_fs_file = grid_fs.find_one({'filename': file_name})
        if grid_fs_file is not None:
            raise InvalidUsage('Product by this name already exist', status_code=422)
        else:
            with grid_fs.new_file(filename=file_name) as fp:
                fp.write(data)
                return json.dumps({'status': 'File saved successfully'}), 200

    def find_image(self, image_name, query):
        grid_fs = GridFS(self.db)
        grid_fs_file = grid_fs.find_one(query)
        response = make_response(grid_fs_file.read())
        response.headers['Content-Type'] = 'application/octet-stream'
        response.headers["Content-Disposition"] = "attachment; filename={}".format(image_name)
        return response
