""" index file for REST APIs using Flask """
import os
import sys
import datetime
from flask import jsonify, make_response, send_from_directory, Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from server.app.controller.error_handler import InvalidUsage


ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'server'))

PUBLIC_PATH = os.path.join(ROOT_PATH, 'public')

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'Shovan'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
flask_bcrypt = Bcrypt(app)
jwt = JWTManager(app)

PORT = os.environ.get('PORT')


def setup_api_blueprints():
    from server.app.controller.user_controller import user_api
    app.register_blueprint(user_api)
    from server.app.controller.product_controller import product_api
    app.register_blueprint(product_api)


# @app.errorhandler(404)
# # def not_found(error):
# #     """ error handler """
# #     # LOG.error(error)
# #     return make_response(jsonify({'error': 'Not found'}), 404)

@app.errorhandler(InvalidUsage)
def not_found(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/', methods=['GET'])
def index():
    """ static files serve """
    return send_from_directory(PUBLIC_PATH, 'index.html')


@app.route('/api/ping', methods=['GET'])
def dummy_endpoint():
    """ Testing endpoint """
    return jsonify({'data': 'Server running'}), 200


if __name__ == '__main__':
    print('Running environment: %s', os.environ.get('ENV'))
    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    setup_api_blueprints()
    app.run(
        host='localhost',
        port=int(4000),
        debug=True
    )
