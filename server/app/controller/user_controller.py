from flask import json, request, jsonify, Blueprint
from server.app.schemas.userservice import UserService as UserService
from server.app.schemas.userschema import validate_user
from server.app.controller.error_handler import InvalidUsage
from bson.objectid import ObjectId
from index import flask_bcrypt, jwt
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, get_jwt_identity)

# LOG = logger.get_root_logger(
#     __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

user_api = Blueprint('user_api', __name__)


@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({
        'ok': False,
        'message': 'Missing Authorization Header'
    }), 401


@user_api.route("/api/users", methods=["GET"])
def index():
    all_user_dump = UserService().find_all_users()
    all_user_list = []
    for user in all_user_dump:
        all_user_list.append(dump(user).json)
    return json_response({'data': all_user_list})


@user_api.route("/api/refresh", methods=["GET"])
@jwt_required
def get_user_on_refresh():
    current_user = get_jwt_identity()
    return json_response({'data': current_user})


@user_api.route("/api/register", methods=["POST"])
def create():
    user_repo = validate_user(json.loads(request.data))
    if user_repo['ok']:
        data = user_repo['data']
        find_user_by_email = {'email': data['email']}
        find_user_by_fullname = {'fullName': data['fullName']}
        email_exist = UserService().find_user(find_user_by_email)
        fullname_exist = UserService().find_user(find_user_by_fullname)
        if email_exist is not None:
            raise InvalidUsage('Email already exist', status_code=422)
        if fullname_exist is not None:
            raise InvalidUsage('Name already exist', status_code=422)
        else:
            data['password'] = flask_bcrypt.generate_password_hash(data['password'])
            saved_user_data = UserService(data).create_new_user(data)
            return json_response({'data': dump(saved_user_data).json})
    else:
        raise InvalidUsage('Bad request parameters: {}'.format(user_repo['message']), status_code=400)


@user_api.route("/api/login", methods=["POST"])
def login():
    user_repo = validate_user(json.loads(request.data))
    if user_repo['ok']:
        data_email = user_repo['data']['email']
        user_query = {'email': data_email}
        data_password = user_repo['data']['password']
        saved_user_data = UserService(data_email).find_user(user_query)
        if saved_user_data is not None:
            password_matched = flask_bcrypt.check_password_hash(saved_user_data['password'], data_password)
            if password_matched and saved_user_data['email'] == data_email:
                access_token = create_access_token(identity=user_repo['data'])
                refresh_token = create_refresh_token(identity=user_repo['data'])
                saved_user_data['token'] = access_token
                saved_user_data['refresh'] = refresh_token
                return json_response({'data': dump(saved_user_data).json})
            else:
                raise InvalidUsage('Email or Password is invalid', status_code=401)
        else:
            raise InvalidUsage('User not found', status_code=404)
    else:
        raise InvalidUsage('Bad request parameters: {}'.format(user_repo['message']), status_code=400)


def json_response(payload, status=200):
    return json.dumps(payload), status, {'content-type': 'application/json'}


def dump(data):
    _id = str(ObjectId(data['_id']))
    email = data['email']
    fullname = data['fullName']
    # password = str(data['password'].decode('utf-8'))
    if 'token' in data:
        token = data['token']
    else:
        token = ''
    if 'refresh' in data:
        refresh = data['refresh']
    else:
        refresh = ''
    # refresh = data['refresh'] if data['refresh'] is not None else ''
    return jsonify({
        'id': _id,
        'email': email,
        'fullName': fullname,
        'token': token,
        'refresh': refresh
    })
