#!/usr/bin/env python3

# Standard library imports
from random import choice as rc
from random import randint
import random
from datetime import date, time

# Remote library imports
from faker import Faker
from faker.providers import BaseProvider

# Local imports
from app import app
from models import db

from models.user import User
from models.job import Job
from models.review import Review
from models.blacklist import Blacklist
from models.hire import Hire

if __name__ == "__main__":
    fake = Faker(locale="en_US")
    with app.app_context():
        print("Deleting all records ...")
        User.query.delete()
        Job.query.delete()
        Review.query.delete()
        Blacklist.query.delete()
        Hire.query.delete()

        print("Creating users ...")

        u1 = User(
            email="pearl@bikini.com",
            _password_hash=fake.password(),
            name="Pearl Krabs",
            bio="I am the greedy founder and owner of the Krusty Krab restaurant, where SpongeBob works as a fry cook and Squidward works as a cashier. I am obsessed with money and dislikes spending it, but will go to great lengths to make even the smallest amounts of money.",
        )

        u2 = User(
            email="spongebob@bikini.com",
            _password_hash=fake.password(),
            name="Spongebob",
            bio="I am good-natured, naive, and enthusiastic sea sponge.",
            profile_pic_url="https://www.j-14.com/wp-content/uploads/2019/07/spongebob-squarepants-characters-35.png?fit=500%2C500&quality=86&strip=all",
        )

        u3 = User(
            email="patrickstar@bikini.com",
            _password_hash=fake.password(),
            name="Patrick Star",
            bio="I am the ignorant but humorous best friend of SpongeBob SquarePants. I am portrayed as being an overweight pink starfish, who serves as the village idiot of the underwater city of Bikini Bottom. I get dumber throughout the series and has been shown to make many ludicrous mistakes.",
            profile_pic_url="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/640px-Patrick_Star.svg.png",
        )

        u4 = User(
            email="squidward@bikini.com",
            _password_hash=fake.password(),
            name="Squidward",
            bio="I am an octopus who lives in a moai between SpongeBob SquarePants and Patrick Star. I am an arrogant and ill-tempered octopus who lives in an Easter Island moai and dislikes his neighbors (especially SpongeBob) for their childlike behavior.",
            profile_pic_url="https://nationaltoday.com/wp-content/uploads/2021/12/Annoy-Squidward-Day-1200x834.jpg",
        )

        u5 = User(
            email="krabs@bikini.com",
            _password_hash=fake.password(),
            name="Mr. Krabs",
            bio="I am a red crab who owns and operates the Krusty Krab restaurant where SpongeBob works. I am obsessed with money and dislikes spending it, but will go to great lengths to make even the smallest amounts of money.",
            profile_pic_url="https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png",
        )

        u6 = User(
            email="sandy@bikini.com",
            _password_hash=fake.password(),
            name="Sandy Cheeks",
            bio="I am a squirrel from Texas and a close friend of SpongeBob and Patrick. I am a thrill seeker who enjoys extreme sports and karate. I live in an air-filled glass treedome to survive underwater.",
            profile_pic_url="https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Sandy_Cheeks.svg/1200px-Sandy_Cheeks.svg.png",
        )

        u7 = User(
            email="SY@bikini.com",
            _password_hash="BikiniBottom",
            name="SY",
            bio="I......",
            profile_pic_url="https://www.coachhousevets.com/wp-content/uploads/2023/04/no-photo-icon-22.png",
        )

        users = [u1, u2, u3, u4, u5, u6, u7]

        db.session.add_all(users)

        print("Creating jobs...")

        job_list = [
            "Babysitting",
            "House Cleaning",
            "Tutoring",
            "Dog Walking",
            "Delivery Service",
            "Event Staffing",
            "Handyman Service",
            "Modeling",
        ]
        j1 = Job(
            job_type='Babysitting',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='1234th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=None,
            date=date(2023, 12, 25),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j2 = Job(
            job_type='Tutoring',
            description='Teach my 5 year old daughter how to read',
            pay_rate=30.0,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=None,
            date=date(2023, 10, 25),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j3 = Job(
            job_type='House Cleaning',
            description='Clean my house',
            pay_rate=12.5,
            address='124 Conch Street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2024, 1, 5),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j4 = Job(
            job_type='House Cleaning',
            description='Clean my house',
            pay_rate=12.5,
            address='124 Conch Street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 10, 27),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j5 = Job(
            job_type='House Cleaning',
            description='Clean my house',
            pay_rate=12.5,
            address='124 Conch Street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 10, 30),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j6 = Job(
            job_type='Handyman Service',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='Krusty Krab restaurant',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=5,
            hire_id=1,
            date=date(2023, 12, 1),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j7 = Job(
            job_type='Babysitting',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='1234th street',
            city='San Francisco',
            state='CA',
            employee_id=5,
            hire_id=2,
            date=date(2023, 11, 30),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j8 = Job(
            job_type='Babysitting',
            description='I need someone to watch my 2 year old daughter for 2 hours while I go to the gym',
            pay_rate=15.5,
            address='Karate Island',
            city='San Francisco',
            state='CA',
            employee_id=4,
            hire_id=3,
            date=date(2023, 10, 25),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='pending',
        )
        j9 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=4,
            hire_id=4,
            date=date(2023, 11, 10),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='pending',
        )
        j10 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='1th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 11, 9),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j11 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='3th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=1,
            hire_id=5,
            date=date(2023, 12, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='pending',
        )
        j12 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=random.randint(10, 30),
            address='4th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=3,
            hire_id=6,
            date=date(2023, 11, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j13 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=7,
            date=date(2023, 12, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j14 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=8,
            date=date(2023, 12, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j15 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=7,
            hire_id=9,
            date=date(2023, 12, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j16 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=2,
            hire_id=10,
            date=date(2023, 12, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j17 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='12th street',
            city='San Francisco',
            state='CA',
            employee_id=2,
            hire_id=11,
            date=date(2023, 12, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='completed',
        )
        j18 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='1th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=3,
            hire_id=None,
            date=date(2023, 12, 2),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j19 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='1th street',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=2,
            hire_id=None,
            date=date(2023, 10, 27),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        j20 = Job(
            job_type=rc(job_list),
            description=fake.text(),
            pay_rate=15.5,
            address='Krusty Krab',
            city='Bikini Bottom',
            state='Underwater',
            employee_id=1,
            hire_id=None,
            date=date(2023, 12, 22),
            start_time='2023-07-19T12:00:00.000Z',
            end_time='2023-07-19T15:00:00.000Z',
            status='active',
        )
        jobs = [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12, j13, j14, j15, j16, j17, j18, j19, j20]

        db.session.add_all(jobs)

        print("Creating reviews...")
        r1 = Review(
            content = "Super easy to work with!",
            rating = 5,
            job_id = 6,
            reviewer_id = 5,
        )
        r2 = Review(
            content = "The job was done well, but the worker was late by 30 minutes",
            rating = 3,
            job_id = 6,
            reviewer_id = 7,
        )
        r3 = Review(
            content = "Such a great worker! Would hire again!",
            rating = 5,
            job_id = 7,
            reviewer_id = 7,
        )
        r4 = Review(
            content = "Such a great boss! Would work for again!",
            rating = 5,
            job_id = 7,
            reviewer_id = 5,
        )
        r5 = Review(
            content = "Horrible boss!!! I would never recommend working for them!",
            rating = 1,
            job_id = 12,
            reviewer_id = 3,
        )
        r6 = Review(
            content = "Worst worker ever!!!",
            rating = 1,
            job_id = 12,
            reviewer_id = 2,
        )
        r7 = Review(
            content = "The worker is definitely a professional! Completed the job in a timely manner! Highly recommend!",
            rating = 5,
            job_id = 13,
            reviewer_id = 7,
        )
        r8 = Review(
            content = "The worker is definitely a professional! Completed the job in a timely manner! Highly recommend!",
            rating = 5,
            job_id = 13,
            reviewer_id = 7,
        )
        r9 = Review(
            content = "The worker is definitely a professional! Completed the job in a timely manner! Highly recommend!",
            rating = 5,
            job_id = 13,
            reviewer_id = 7,
        )
        r10 = Review(
            content = "The worker is definitely a professional! Completed the job in a timely manner! Highly recommend!",
            rating = 5,
            job_id = 13,
            reviewer_id = 2,
        )
        r11 = Review(
            content = 'BOSS IS A SCAMMER!!!',
            rating = 1,
            job_id = 14,
            reviewer_id = 7,
        )
        r12 = Review(
            content = 'She is supper friendly and I am willing to work with her again.',
            rating = 5,
            job_id = 14,
            reviewer_id = 7,
        )
        r13 = Review(
            content = 'Nothing to say',
            rating = 3,
            job_id = 15,
            reviewer_id = 7,
        )
        r14 = Review(
            content = '............',
            rating = 4,
            job_id = 16,
            reviewer_id = 2,
        )
        r15 = Review(
            content = 'They are very nice and I am willing to work with them again.',
            rating = 4,
            job_id = 17,
            reviewer_id = 4,
        )
        r11 = Review(
            content = 'Overall, I am satisfied with the work.',
            rating = 3,
            job_id = 15,
            reviewer_id = 4,
        )
        r11 = Review(
            content = 'Worst worker ever!!!',
            rating = 1,
            job_id = 16,
            reviewer_id = 4,
        )
        r11 = Review(
            content = 'Woring with them is ....!',
            rating = 3,
            job_id = 17,
            reviewer_id = 4,
        )
        reviews = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15]
        db.session.add_all(reviews)

        print("Creating blacklists ...")
        blacklists = []
        for _ in range(5):
            blacklist = Blacklist(
                email=fake.email(),
            )
            blacklists.append(blacklist)
        db.session.add_all(blacklists)

        print("Creating hires ...")
        h1 = Hire(
            job_id=6,
            job_seeker_id=7,
        )
        h2 = Hire(
            job_id=7,
            job_seeker_id=7,
        )
        h3 = Hire(
            job_id=8,
            job_seeker_id=7,
        )
        h4 = Hire(
            job_id=9,
            job_seeker_id=5,
        )
        h5 = Hire(
            job_id=11,
            job_seeker_id=3,
        )
        h6 = Hire(
            job_id=12,
            job_seeker_id=2,
        )
        h7 = Hire(
            job_id=13,
            job_seeker_id=2,
        )
        h8 = Hire(
            job_id=14,
            job_seeker_id=1,
        )
        h9 = Hire(
            job_id=15,
            job_seeker_id=4,
        )
        h10 = Hire(
            job_id=16,
            job_seeker_id=4,
        )
        h11 = Hire(
            job_id=17,
            job_seeker_id=4,
        )

        hires = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11]
        db.session.add_all(hires)

        print("Committing ...")
        db.session.commit()

        print("Done!")
