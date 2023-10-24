from blueprints import Blueprint, ValidationError
from flask import request, make_response, session
from flask_restful import Resource
from models import db
from models.user import User
from schemas.user_schema import UserSchema

user_schema = UserSchema()
user_by_id_bp = Blueprint("user_by_id", __name__, url_prefix="/users")


class UserById(Resource):

    def get(self, id):
        user = db.session.query(User).get(id)
        if user:
            return make_response(user_schema.dump(user), 200)
        return make_response({"error": "User not found"}, 404)

    def patch(self, id):
        user = db.session.query(User).get(id)
        if user:
            try:
                data = request.get_json()
                updated_user_data = user_schema.load(data, instance=user, partial=True)
                db.session.add(updated_user_data)  # This line ensures that the updated user object is tracked by the session
                db.session.commit()
                return make_response(user_schema.dump(updated_user_data), 200)
            except ValidationError as e:  # Catching ValidationError from Marshmallow
                db.session.rollback()
                return make_response({"error": e.messages}, 422)
        return make_response({"error": "User not found"}, 404)

    def delete(self, id):
        user = db.session.query(User).get(id)
        if user:
            try:
                current_user = db.session.query(User).get(session["user_id"])
                if user == current_user:
                    db.session.delete(user)
                    db.session.commit()
                    return make_response("", 204)
                return make_response({"error": "Unauthorized"}, 401)
            except Exception as e:
                db.session.rollback()
                return make_response({"errors": [str(e)]}, 400)
        return make_response({"error": "User not found"}, 404)
