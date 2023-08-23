# GIGU

This on demand job search app is created using React frontend and Python with Flask backend. The app is deployed on Render and can be accessed at [GIGU](https://gigu-flatiron-version-deploy.onrender.com)

Please see the instructions below to run the app locally. You can also visit this README.md file for a walkthrough of the app.

--------------------

## Installation
1. Fork and clone this repo to your local environment.
2. Navigate to the root directory of the project.
3. Run `pipenv install` to install the dependencies.
4. Create a virtual environment with `pipenv shell`.
5. Open another terminal and cd into the client directory.
6. Run `npm install` to install the dependencies.

### .env setup
1. Create a .env file in the root directory of the project.
2. Add the following environment variables to the .env file:
```SECRET_KEY=your_secret_key```
3. Run `python -c 'import os; print(os.urandom(16))'` to generate a secret key.
4. Copy the secret key and paste it after the equal sign in the .env file.
5. Add `.env` to the `.gitignore` file.

### Database setup
![image description](./markdown/Screenshot%202023-07-20%20at%206.57.26%20PM.png)
The models are defined in the `models.py` file. The database is created using SQLAlchemy and PostgreSQL. The database is seeded with data from the `seed.py` file. The database is queried using SQLAlchemy ORM.
1. Run `flask db init` to initialize the database.
2. Run `flask db migrate` to create the migration file.
3. Run `flask db upgrade head` to create the tables in the database.
4. Run `python seed.py` to seed the database with data.

### Start the app
1. Run `python server/app.py` to start the app.
2. Open another terminal and cd into the client directory.
3. Run `npm start` to start the app.

--------------------
## License
This project is licensed under the terms of the MIT license.
