from blueprints import Resource, Blueprint, make_response, g, abort 
from models import db
from models.review import Review
from schemas.review_schema import ReviewSchema
from blueprints import request, session, Resource, Blueprint, make_response, g, abort
from flask import Flask, jsonify
review_schema = ReviewSchema()
review_by_id_bp = Blueprint("review_by_id", __name__, 
                                    url_prefix="/reviews/<int:id>")

class ReviewById(Resource):
    def get(self, id):
        review = review_schema.dump(db.session.get(Review, id))
        return make_response(review, 200)
    

    # @login_required
    def delete(self, id):
        try:
            review = db.session.get(Review, id)
            db.session.delete(review)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception as e:
            return make_response(jsonify({"error": "Review not found"}), 404)