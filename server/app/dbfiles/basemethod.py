class Repository(object):
    def __init__(self, adapter=None):
        if not adapter:
            raise ValueError("Invalid repository implementation")
        self.client = adapter()

    def find_all(self, db_collection):
        return self.client.find_all(db_collection)

    def find(self, db_collection, selector):
        return self.client.find(db_collection, selector)

    def find_image(self, image_name, selector):
        return self.client.find_image(image_name, selector)

    def create(self, db_collection, obj):
        return self.client.create(db_collection, obj)

    def create_image(self, image_name, obj):
        return self.client.create_image(image_name, obj)

    def update(self, db_collection, selector, data):
        return self.client.update(db_collection, selector, data)

    def delete(self, db_collection, selector):
        return self.client.delete(db_collection, selector)
