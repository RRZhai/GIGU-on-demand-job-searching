from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Review
)

class ReviewSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Review
        load_instance = True
        ordered = True
        fields = ("id", "content", "rating", 'job_id', 'reviewer_id', 'user', "url")
    
    job = fields.Nested("JobSchema", only=("id", "url"))
    user = fields.Nested("UserSchema", only=("id", "email", 'name', "url"))
    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "reviewbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("reviews")
        }
    )