#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, render_template
from flask_restful import Resource
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, JWTManager, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from datetime import timedelta
# Local imports
from config import app, db, api

from models.user import User
from models.job import Job
from models.review import Review
from models.blacklist import Blacklist
from models.hire import Hire

from blueprints.blacklists import Blacklists
from blueprints.check_session import CheckSession
from blueprints.hire_by_id import HireById
from blueprints.hires import Hires
from blueprints.job_by_id import JobById
from blueprints.jobs import Jobs
from blueprints.login import Login
from blueprints.logout import Logout
from blueprints.review_by_id import ReviewById
from blueprints.reviews import Reviews
from blueprints.signup import Signup
from blueprints.user_by_name import UserByName
from blueprints.user_by_id import UserById
from blueprints.users import Users
from blueprints.signup import signup_bp
from blueprints.login import login_bp
from blueprints.logout import logout_bp
from blueprints.users import users_bp
from blueprints.login_google import login_with_google_bp
from blueprints.me import me_bp

api.add_resource(Blacklists, "/blacklists")
api.add_resource(CheckSession, "/checksession") 
api.add_resource(HireById, "/hires/<int:id>")
api.add_resource(Hires, "/hires")
api.add_resource(JobById, "/jobs/<int:id>")
api.add_resource(Jobs, "/jobs")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(ReviewById, "/reviews/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(Signup, "/signup")
api.add_resource(UserByName, "/users/<string:name>")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Users, "/users")

app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(users_bp)
app.register_blueprint(login_with_google_bp)
app.register_blueprint(me_bp)

@app.route('/')
@app.route('/login')
@app.route('/signup')
@app.route('/logout')
@app.route('/jobs')
@app.route('/login_with_google')
@app.route('/me')

@app.route('/<int:id>')
def index(id=0):
    return render_template('index.html')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
