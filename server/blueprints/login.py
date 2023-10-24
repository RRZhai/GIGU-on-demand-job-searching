from blueprints import Resource, Blueprint, make_response, g, abort 
from blueprints.user_by_id import user_schema
from models import db
from models.user import User
from flask import Flask, session, request
from flask_jwt_extended import (
    create_access_token, 
    create_refresh_token, 
    set_access_cookies,
    set_refresh_cookies,
)

login_bp = Blueprint("login", __name__, url_prefix="/login")

class Login(Resource):
    def post(self): 
        try:
            data = request.get_json()

            email = data.get('email')
            password = data.get('password')
            if user := User.query.filter(User.email == email).first():
                if user.authenticate(password):
                    session['user_id'] = user.id
                    # import ipdb; ipdb.set_trace()
                    token = create_access_token(identity=user.id)
                    refresh_token = create_refresh_token(identity=user.id)
                    response = make_response({'user': user_schema.dump(user)}, 201)
                    set_access_cookies(response, token)
                    set_refresh_cookies(response, refresh_token)

                    return response
            return make_response({'error': 'Invalid credentials'}, 401)
        except: 
            return make_response({'error': 'Invalid credentials'}, 401) 