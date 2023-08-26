from .__init__ import fields, validate, validates, ValidationError, ma, Hire


class HireSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Hire
        load_instance = True
        ordered = True
        fields = ("id", "job_id", "job_seeker_id", "user", "url")

    job = fields.Nested("JobSchema", only=("id", "job_type", "url"))
    user = fields.Nested("UserSchema", only=("id", "email", 'name', 'bio', 'profile_pic_url', "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor("hirebyid", values=dict(id="<id>")),
            "collection": ma.URLFor("hires"),
        }
    )
