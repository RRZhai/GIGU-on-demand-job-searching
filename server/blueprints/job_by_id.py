from blueprints import login_required, Resource, Blueprint, make_response, g, abort 
from models import db
from models.job import Job
from schemas.job_schema import JobSchema
from blueprints import request, session, Resource, Blueprint, make_response, g, abort
from flask import Flask, jsonify
job_schema = JobSchema()
job_by_id_bp = Blueprint("job_by_id", __name__, 
                                    url_prefix="/jobs/<int:id>")

class JobById(Resource):
    def get(self, id):
        job = job_schema.dump(db.session.get(Job, id))
        return make_response(job, 200)
    
    @login_required
    def delete(self, id):
        try:
            job = db.session.get(Job, id)
            db.session.delete(job)
            db.session.commit()
            return make_response(jsonify({}), 204)
        except Exception as e:
            return make_response(jsonify({"error": "Job not found"}), 404)
        
    @login_required
    def patch(self, id):
        try:
            data = db.session.get(Job, id)
            job = job_schema.load(request.get_json(), instance=data, partial=True)
            db.session.add(job)
            import ipdb; ipdb.set_trace()
            db.session.commit()
            return make_response(jsonify(job_schema.dump(job)), 200)    
        except Exception as e:
            return make_response(jsonify({"error": "Job not found"}), 404)