# from server.app.controller.api.middlewares import login_required
from bson.objectid import ObjectId
from flask import json, request, jsonify, Blueprint, make_response
from server.app.schemas.productschema import validate_product
from server.app.schemas.productservice import ProductService as ProductService
from server.app.controller.error_handler import InvalidUsage
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)

product_api = Blueprint('product_api', __name__)


@product_api.route("/api/products", methods=["GET"])
@jwt_required
def index():
    current_user = get_jwt_identity()
    all_products_dump = ProductService(current_user).find_all_products()
    all_products_list = []
    for product in all_products_dump:
        all_products_list.append(dump(product).json)
    return json_response({'data': all_products_list})


@product_api.route("/api/product/<product_id>", methods=["GET"])
@jwt_required
def find(product_id):
    current_user = get_jwt_identity()
    db_query = {'_id': ObjectId(product_id)}
    product_exist = ProductService(current_user).find_product(db_query)
    if product_exist:
        return json_response({'data': dump(product_exist).json})
    else:
        raise InvalidUsage('Product not found', status_code=404)


@product_api.route("/api/image/<image_name>", methods=["GET"])
def find_image(image_name):
    current_user = get_jwt_identity()
    db_query = {'filename': image_name}
    image_exist = ProductService(current_user).find_image(image_name, db_query)
    if image_exist:
        return image_exist
    else:
        raise InvalidUsage('Image not found', status_code=404)


@product_api.route("/api/add_product", methods=["POST"])
@jwt_required
def create():
    current_user = get_jwt_identity()
    valid_repo = validate_product(json.loads(request.data))
    if valid_repo['ok']:
        data = valid_repo['data']
        find_product_by_name = {'name': data['name']}
        product_exist = ProductService().find_product(find_product_by_name)
        if product_exist is not None:
            raise InvalidUsage('Product by this name already exist', status_code=422)
        else:
            saved_product_data = ProductService(current_user).create_new_product(data)
            return json_response({'data': dump(saved_product_data).json})
    else:
        raise InvalidUsage('Bad request parameters: {}'.format(valid_repo['message']), status_code=400)


@product_api.route('/api/add_image', methods=['POST'])
def upload():
    current_user = get_jwt_identity()
    image_repo = request.files['file']
    image_name = image_repo.filename
    image_data = image_repo
    saved_product_data = ProductService(current_user).create_new_image(image_name, image_data)
    return saved_product_data


@product_api.route("/api/product/<product_id>", methods=["DELETE"])
@jwt_required
def delete(product_id):
    current_user = get_jwt_identity()
    if ProductService(current_user).delete_product(product_id):
        return json_response({})
    else:
        raise InvalidUsage('Product not found', status_code=404)


@product_api.route("/api/product/<product_id>", methods=["PUT"])
@jwt_required
def update(product_id):
    product_repo = validate_product(json.loads(request.data))
    if product_repo['ok']:
        data = product_repo['data']
        find_product_by_name = {'name': data['name']}
        product_exist = ProductService().find_product(find_product_by_name)
        if product_exist is not None:
            raise InvalidUsage('Product by this name already exist', status_code=422)
        else:
            if ProductService().update_product(product_id, data):
                return json_response(data)
            else:
                raise InvalidUsage('Product not found', status_code=404)

    else:
        raise InvalidUsage('Bad request parameters: {}'.format(product_repo['message']), status_code=400)


def json_response(payload, status=200):
    return json.dumps(payload), status, {'content-type': 'application/json'}


def dump(data):
    _id = str(ObjectId(data['_id']))
    name = data['name']
    description = data['description']
    img_url = data['img_url']
    price = data['price']
    return jsonify({'id': _id, 'name': name, 'description': description, 'price': price, 'img_url': img_url})
