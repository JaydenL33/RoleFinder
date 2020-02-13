from src import db, create_app
from src.models import User
from src.config import Config

import pandas as pd 


csvfile = pd.read_csv("./data/employees.csv")

app = create_app()

with app.app_context():
    for idx, row in csvfile.iterrows():
        name = row['Name ']
        strengths = row["Strength 1"]
        username = row["Enterprise_ID"].lower()

        try:
            careerlevel = int(row["Career Level"].split(" - ")[0])
        except ValueError as e:
            careerlevel = 4
            print("Managing director")

        for i in range(2, 11):
            strengths = strengths + " " + row[f"Strength {i}"]

        user = User(name=name, clifton=strengths, username=username, careerlevel=careerlevel)
        db.session.add(user)

    db.session.commit()