from blueprints import login_required, Resource, Blueprint, make_response, g, abort 
from models import db
from models.hire import Hire
from schemas.hire_schema import HireSchema
from blueprints import request, session, Resource, Blueprint, make_response, g, abort
from flask import Flask, jsonify
hire_schema = HireSchema()
hire_by_id_bp = Blueprint("hire_by_id", __name__, 
                                    url_prefix="/hires/<int:id>")

class HireById(Resource):
    def get(self, id):
        hire = hire_schema.dump(db.session.get(Hire, id))
        return make_response(hire, 200)

    @login_required    
    def delete(self, id):
        try:
            hire = db.session.get(Hire, id)
            db.session.delete(hire)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception as e:
            return make_response(jsonify({"error": "Hire not found"}), 404)