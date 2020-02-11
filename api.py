from flask import Flask, request, Response
import json

app = Flask(__name__)


@app.route('/')
def serverCheck():
    return "Server running"



@app.route('/login', methods=['POST'])
def login():

    req = request.json 

    if ("login" not in req.keys()) or ("password" not in req.keys()):
        return Response("login details not provided", status=400, mimetype='text/plain')

    if (req["login"] == "admin") and (req["password"] == "admin"):
        return Response("success", status=200, mimetype='text/plain')
    else:
        return Response("login failed", status=400, mimetype='text/plain')
    


@app.route('/jobsearch', methods=['GET'])
def job_search():
    req = request.json 

    res = [{
        "job-match-score": 96.8, 
        "city": "London",
        "country": "United Kingdom", 
        "assignment-title": "Instructional Designer",
        "description": "Develop and/or manage the development of training solutions using prescribed tools. Follow Content Development Center process, quality, budget and milestone standards. Implement the overall instructional design of learning products developed in the Content Development Center ensuring that projects successfully evolve from sponsor/stakeholders expectations through the development of assets and their effective and efficient deployment.",
        "project-supervising-entity": "Products",
        "sold": True,
        "client-contract-based": False,
        "requested-start-data": "6-Feb-20",
        "end-date": "6-Mar-20",
        "status": "Open",
        "talent-segment": "Business Process Specialization", 
        "assigned-role": "Instructional designer",
    }, {
        "job-match-score": 92.1, 
        "city": "London",
        "country": "United Kingdom", 
        "assignment-title": "Application Developer",
        "description": "Develop and/or manage the development of training solutions using prescribed tools. Follow Content Development Center process, quality, budget and milestone standards. Implement the overall instructional design of learning products developed in the Content Development Center ensuring that projects successfully evolve from sponsor/stakeholders expectations through the development of assets and their effective and efficient deployment.",
        "project-supervising-entity": "Products",
        "sold": True,
        "client-contract-based": False,
        "requested-start-data": "10-Feb-20",
        "end-date": "10-Mar-20",
        "status": "Open",
        "talent-segment": "Business Process Specialization", 
        "assigned-role": "Application Developer",
    }]

    res = json.dumps(res)
    res = Response(res, status=200, mimetype="application/json")
    return res