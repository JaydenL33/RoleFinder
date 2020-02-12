from flask import Blueprint, jsonify, request, Response, current_app
from datetime import datetime
from . import db
from .models import User
from .utils import isLegitLogin, getUser, buildJobSearchQuery
import json

api = Blueprint("api", __name__)

@api.route("/jobsearch", methods=['POST'])
def jobsearch():

    req = request.json
    
    if req is None:
        res = json.dumps({
            "successful": False, 
            "message": "The user must be specified"
        })
        return Response(res, status=400, mimetype='application/json')

    if ("user" not in req.keys()):
        res = json.dumps({
            "successful": False, 
            "message": "The user must be specified"
        })
        return Response("user must be specified", status=400, mimetype='application/json')

    query = getUser(req["user"])
    user_strengths = query.clifton

    if query is None:
        res = json.dumps({
            "successful": False, 
            "message": "The user doesn't exist"
        })

        return Response(res, status=400, mimetype='application/json')

    # Fields to search for keywords in
    keyword_search_fields = [
        'Description', 
        'AssignmentTitle^3', 
        'TalentSegment^3'
    ]

    # Fields to search for user strengths in
    user_strengths_search_fields = [
        'Quadrant1^2', 
        'Quadrant2'
    ]

    careerLevel = req["careerLevel"] if "careerLevel" in req.keys() else None 
    location = req["location"] if "location" in req.keys() else None 
    keywords = req["keywords"] if "keywords" in req.keys() else None
    careerLevel = req["careerlevel"] if "careerlevel" in req.keys() else None 
    department = req["department"] if "department" in req.keys() else None
    
    job_search_query = buildJobSearchQuery(
        user_strengths, 
        department=department, 
        keywords=keywords, 
        careerLevel=careerLevel, 
        location=location
    )

    search_results = current_app.elasticsearch.search(index='joblistings', body=job_search_query)

    return Response(str(search_results), 200, mimetype='application/json')


@api.route("/addinterests")
def addInterest():
    req = request.json 
    # Req includes 'username', ['interests': str]
    if req is None:
        res = json.dumps({
            "successful": False, 
            "message": "The user must be specified"
        })

    if ("user" not in req.keys()):
        res = json.dumps({
            "successful": False, 
            "message": "The user must be specified"
        })
        return Response("user must be specified", status=400, mimetype='application/json')
    user = getUser(req["User"])
    user.interests = ""
    interests = req["interests"]

    for i in len(interests):
        user.interests = user.interests.append(interests[i])
    db.session.commit()







@api.route("/removeinterest")
def removeInterest():
    req = request.json 
    # Req includes 'username', ['interests': str]



@api.route("/login", methods=['POST'])
def login():
    
    req = request.json 

    if req is None:
        return Response("login details not provided", status=400, mimetype='text/plain')

    if ("login" not in req.keys()) or ("password" not in req.keys()):
        return Response("login details not provided", status=400, mimetype='text/plain')

    if (isLegitLogin(req["login"], req["password"])):
        return Response("success", status=200, mimetype='text/plain')

    else:
        return Response("login failed", status=400, mimetype='text/plain')


@api.route("/userinfo", methods=['POST'])
def userinfo():
    req = request.json 
    res = {"successful": True}

    if "name" not in req.keys():
        res["successful"] = False
        res["message"] = "name not provided"
        return Response(res, status=401, mimetype="application/json")
    
    else:
        result = User.query.filter_by(name=req["name"]).first()
        if result is not None:
            res["name"] = result.name
            res["strengths"] = result.clifton.split(" ")
            res["interests"] = result.interests
            res = json.dumps(res)

    return Response(res, status=200, mimetype='application/json')
    

@api.route("/")
def serverCheck():
    """Return a friendly HTTP greeting."""
    return "Server Running"

