from blueprints import Resource, Blueprint, make_response, g, abort
from models import db
from models.user import User
from schemas.user_schema import UserSchema
from blueprints import request, session, Resource, Blueprint, make_response, g, abort
from flask import Flask, jsonify

user_schema = UserSchema()
user_by_id_bp = Blueprint("user_by_id", __name__, url_prefix="/users/<int:id>")


class UserById(Resource):
    def get(self, id):
        if user := user_schema.dump(db.session.get(User, id)):
            return make_response(user, 200)
        return make_response({"error": "User not found"}, 404)

    def patch(self, id):
        try:
            print(type(db.session))
            print(db.session.bind)
            data = User.query.get(id)
            print(type(db.session))
            print(db.session.bind)
            # import ipdb; ipdb.set_trace()
            user = user_schema.load(request.get_json(), instance=data, partial=True)
            db.session.add(user)
            db.session.commit()
            return make_response(jsonify(user_schema.dump(user)), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": [str(e)]}, 422)

    def delete(self, id):
        if user := db.session.get(User, id):
            try:
                current_user = db.session.get(User, session["user_id"])
                if user == current_user:
                    db.session.delete(user)
                    db.session.commit()

                    return make_response("", 204)
                return make_response({"error": "Unauthorized"}, 401)
            except Exception as e:
                db.session.rollback()
                return make_response({"errors": [str(e)]}, 400)
        return make_response({"error": "User not found"}, 404)
