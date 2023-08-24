from marshmallow import (fields, validate, validates, ValidationError)
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemySchema
from flask_sqlalchemy import SQLAlchemy
from models.blacklist import Blacklist
from models.hire import Hire
from models.job import Job
from models.review import Review
from models.user import User

ma = Marshmallow()
db = SQLAlchemy()