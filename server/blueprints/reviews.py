from blueprints import login_required, session, request, Resource, Blueprint, make_response, g, abort
from blueprints.review_by_id import review_schema
from models import db
from models.review import Review
from models.user import User
from schemas.review_schema import ReviewSchema

reviews_schema = ReviewSchema(many=True)
reviews_bp = Blueprint("reviews", __name__, url_prefix="/reviews")

class Reviews(Resource):
    def get(self):
        reviews = reviews_schema.dump(Review.query.order_by(Review.created_at.desc()).all())
        return make_response(reviews, 200)
    
    @login_required
    def post(self):
        try:
            data = request.get_json()
            review = Review(**data)
        
            db.session.add(review)
            # import ipdb; ipdb.set_trace()
            db.session.commit()
                
            return make_response(review_schema.dump(review), 201)
        except Exception as e: 
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)