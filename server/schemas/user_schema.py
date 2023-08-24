from .__init__ import fields, validate, validates, ValidationError, ma, User

from models.user import User
import re


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True
        ordered = True
        fields = (
            "id",
            "email",
            "name",
            "bio",
            "profile_pic_url",
            "jobs",
            "hires",
            "reviews",
            "url",
        )

    email = fields.String(
        required=True, validate=validate.Email(error="Invalid email address")
    )
    name = fields.String(
        validate=validate.Length(
            min=5, max=50, error="Display name must be between 5 and 50 chars"
        ),
    )
    bio = fields.String(
        validate=validate.Length(max=250, error="Bio must be less than 250 chars"),
        allow_none=True,
    )
    profile_pic_url = fields.String(
        required=True, validate=validate.URL(error="Invalid URL")
    )
    jobs = fields.Nested(
        "JobSchema", only=("id", "job_type", "pay_rate", "status"), many=True
    )
    hires = fields.Nested("HireSchema", only=("id", "job_id"), many=True)
    reviews = fields.Nested("ReviewSchema", only=("id", "rating", "job_id"), many=True)
    url = ma.Hyperlinks(
        {
            "self": ma.URLFor("userbyid", values=dict(id="<id>")),
            "collection": ma.URLFor("users"),
        }
    )

    @validates("name")
    def validates_username(self, name):
        if user := User.query.filter(User.name == name).first():
            if not user.id:
                raise ValidationError("That username is taken")
        if not re.match(r"^[A-z0-9]+$", name):
            raise ValidationError("Username may only contain letters and digits")

    @validates("password")
    def validate_password(self, password):
        if type(password) is not str or len(password) < 10:
            raise ValueError(f"{password} has to be at least 10 characters long")
        if not re.search(r"[A-Z]", password):
            raise ValueError(f"{password} has to have at least one uppercase letter")
        if not re.search(r"[a-z]", password):
            raise ValueError(f"{password} has to have at least one lowercase letter")
        if not re.search(r"[0-9]", password):
            raise ValueError(f"{password} has to have at least one number")
        if not re.search(r"[^A-Za-z0-9]", password):
            raise ValueError(f"{password} has to have at least one special character")
        return password
