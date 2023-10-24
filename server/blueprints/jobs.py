from blueprints import (
    login_required,
    session,
    request,
    Resource,
    Blueprint,
    g,
    abort,
)
from blueprints.job_by_id import job_schema
from models import db
from models.job import Job
from models.user import User
from schemas.job_schema import JobSchema
from flask import Flask, session, jsonify, make_response

jobs_schema = JobSchema(many=True)
job_schema = JobSchema()
jobs_bp = Blueprint("jobs", __name__, url_prefix="/jobs")


class Jobs(Resource):
    def get(self):
        jobs = jobs_schema.dump(Job.query.order_by(Job.created_at.desc()).all())
        return make_response(jobs, 200)

    @login_required
    def post(self):
        try:
            data = request.get_json()
            new_job = Job(**data)
        
            db.session.add(new_job)
            # import ipdb; ipdb.set_trace()
            db.session.commit()

            return make_response(jsonify(job_schema.dump(new_job)), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)
        