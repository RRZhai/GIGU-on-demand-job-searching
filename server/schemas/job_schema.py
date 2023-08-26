from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Job
)

class JobSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Job
        load_instance = True
        ordered = True
        fields = ("id", "job_type", "description", 'pay_rate', "address", 'city', 'state', 'employee_id', 'user','date','start_time', 'end_time', 'status', 'hire_id', 'hires', "url")
    
    reviews = fields.Nested("ReviewSchema", only=("id", 'content', "url"))
    user = fields.Nested("UserSchema", only=("id", "email", 'name', 'bio', 'profile_pic_url', "url"))
    hires = fields.Nested('HireSchema', only=('id', 'job_seeker_id', 'user','url'))
    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "jobbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("jobs")
        }
    )