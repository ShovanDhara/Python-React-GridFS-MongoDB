from server.app.dbfiles.basemethod import Repository
from server.app.dbfiles.mongo import MongoRepository
from bson.objectid import ObjectId

class ProductService(object):
    def __init__(self, product_id='', repo_client=Repository(adapter=MongoRepository)):
        self.repo_client = repo_client
        self.product_id = product_id
        self.db_collection = 'products'

    def find_all_products(self):
        products = self.repo_client.find_all(self.db_collection)
        return products

    def find_product(self, query):
        product = self.repo_client.find(self.db_collection, query)
        return product

    def create_new_product(self, product_object):
        self.repo_client.create(self.db_collection, product_object)
        return product_object

    def delete_product(self, product_id):
        records_affected = self.repo_client.delete(self.db_collection, {'_id': ObjectId(product_id)})
        return records_affected > 0

    def update_product(self, product_id, obj):
        updated_product = self.repo_client.update(self.db_collection, {'_id': ObjectId(product_id)}, obj)
        return updated_product > 0


