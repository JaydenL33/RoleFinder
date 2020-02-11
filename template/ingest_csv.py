from src import db, create_app
from src.models import User
from src.config import Config

import pandas as pd 


csvfile = pd.read_csv("./employees.csv")

app = create_app()

with app.app_context():
    for idx, row in csvfile.iterrows():
        name = row['Name ']
        strengths = row["Strength 1"]
        username = row["Enterprise_ID"].lower()

        for i in range(2, 11):
            strengths = strengths + " " + row[f"Strength {i}"]

        user = User(name=name, clifton=strengths, username=username)
        db.session.add(user)

    db.session.commit()


# app=create_app()

# with app.app_context():
#     u = User(name="Joseph")
#     db.session.add(u)
#     db.session.commit()
#     print(u)
