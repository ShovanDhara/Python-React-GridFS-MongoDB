from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

product_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "description": {
            "type": "string",
        },
        "img_url": {
            "type": "string",
        },
        "price": {
            "type": "integer",
        }
    },
    "required": ["name", "img_url", "price"],
    "additionalProperties": False
}


def validate_product(data):
    try:
        validate(data, product_schema)
    except ValidationError as error:
        return {'ok': False, 'message': error}
    except SchemaError as error:
        return {'ok': False, 'message': error}
    return {'ok': True, 'data': data}
