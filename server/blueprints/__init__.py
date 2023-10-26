from flask import request, session, Blueprint, make_response, abort, g
from flask_restful import Resource
from marshmallow import ValidationError

from functools import wraps

def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            abort(401, 'Unauthorized')
        return func(*args, **kwargs)
    return wrapper