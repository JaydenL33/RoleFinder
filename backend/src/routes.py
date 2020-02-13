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
            "message": "The userid must be specified"
        })
        return Response(res, status=400, mimetype='application/json')

    if ("userid" not in req.keys()):
        res = json.dumps({
            "successful": False, 
            "message": "The userid must be specified"
        })
        return Response(res, status=400, mimetype='application/json')

    user = getUser(req["userid"])
    

    if user is None:
        res = json.dumps({
            "successful": False, 
            "message": "The user doesn't exist"
        })
        return Response(res, status=400, mimetype='application/json')


    user_strengths = user.clifton
        

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

    location = req["location"] if "location" in req.keys() else None 
    keywords = req["keywords"] if "keywords" in req.keys() else None
    careerLevel = req["careerlevel"] if "careerlevel" in req.keys() else None 
    department = req["department"] if "department" in req.keys() else None
    favourites = req["usefavourites"] if "usefavourites" in req.keys() else None
    

    in_country = req["incountry"] if "incountry" in req.keys() else None 
    employee_level_only = req["employeecareerlevelonly"] if "employeecareerlevelonly" in req.keys() else None 

    if employee_level_only == True:
        careerLevel = user.careerlevel

    if in_country == True:
        location = "Sydney Melbourne Canberra Perth Darwin Hobart Adelaide"

    if favourites:
        if len(user.favourites) > 0:
            favourites = user.favourites.split(" ")
        else:
            favourites = None

    job_search_query = buildJobSearchQuery(
        user_strengths, 
        department=department, 
        keywords=keywords, 
        careerLevel=careerLevel, 
        location=location,
        favourites=favourites
    )

    search_results = current_app.elasticsearch.search(index='joblistings', body=job_search_query)

    res = {
        "successful": True,
        "count": search_results["hits"]["total"]["value"],
        "hits": []
    }

    for result in search_results["hits"]["hits"]:
        res["hits"].append({
            "jobid": result["_id"],
            "title": result["_source"]["AssignmentTitle"], 
            "description": result["_source"]["Description"],
            "location": result["_source"]["Location"],
            "startdate": result["_source"]["StartDate"],
            "enddate": result["_source"]["EndDate"],
            "status": result["_source"]["Status"],
            "careerLevelFrom": result["_source"]["CareerLevelFrom"],
            "careerLevelTo": result["_source"]["CareerLevelTo"],
            "quadrant1": result["_source"]["Quadrant1"],
            "quadrant2": result["_source"]["Quadrant2"],
            "department": result["_source"]["AssignmentFulfillmentEntity1"]
        })

    res = json.dumps(res)

    return Response(res, 200, mimetype='application/json')


@api.route("/setInterests", methods=["POST"])
def modifyInterests():
    req = request.json
    res = {"successful": True} 


    # Req includes 'username', ['interests': str]
    if req is None:
        res = json.dumps({
            "successful": False, 
            "message": "The user must be specified"
        })
        return Response(res, status=400, mimetype='application/json')

    if ("userid" not in req.keys() or "interests" not in req.keys()):
        res = json.dumps({
            "successful": False, 
            "message": "The userid or interests were not specified"
        })
        return Response(res, status=400, mimetype='application/json')
    
    else:
        user = getUser(req["userid"])
        if user != None:

            new_interests = req["interests"]
            new_interests = set(new_interests)

            new_interests = " ".join(new_interests)
            user.interests = new_interests
            
            db.session.commit()

            # Response Back
            res["name"] = user.name
            res["successful"] = True
            res["interests"] = user.interests.split(" ")
            res = json.dumps(res)
            return Response(res, status=200, mimetype='application/json')
        

        res = json.dumps({
            "successful": False, 
            "message": "There was an error"
        })
        return Response(res, status=400, mimetype='application/json')

@api.route("/addFavourites", methods=["POST"])
def addFavourites():
    req = request.json
    res = {"successful": True} 


    # Req includes 'username', ['interests': str]
    if req is None:
        res = json.dumps({
            "successful": False, 
            "message": "The user must be specified"
        })
        return Response(res, status=400, mimetype='application/json')

    if ("userid" not in req.keys()):
        res = json.dumps({
            "successful": False, 
            "message": "The userid were not specified"
        })
        return Response(res, status=400, mimetype='application/json')
    
    user = getUser(req["userid"])
    if user != None:

        new_favourite = req["favourites"]
        new_favourite = new_favourite

        if len(user.favourites) == 0:
            user.favourites = new_favourite
        else:
            user.favourites = user.favourites + " " + new_favourite
        db.session.commit()

        # Response Back
        res["name"] = user.name
        res = json.dumps(res)
        return Response(res, status=200, mimetype='application/json')
    

    res = json.dumps({
        "successful": False, 
        "message": "There was an error"
    })
    return Response(res, status=400, mimetype='application/json')


@api.route("/login", methods=['POST'])
def login():
    
    req = request.json 

    if req is None:
        res = {
            "successful": False,
            "message": "Did not receive a valid request"
        }
        return Response(res, status=400, mimetype='appliation/json')

    if ("userid" not in req.keys()) or ("password" not in req.keys()):
        res = {
            "successful": False,
            "message": "Did not receive login details"
        }
        res = json.dumps(res)
        return Response(res, status=400, mimetype='application/json')

    if (isLegitLogin(req["userid"], req["password"])):
        res = {
            "successful": True,
            "userid": req["userid"]
        }
        res = json.dumps(res)
        return Response(res, status=200, mimetype='application/json')

    else:
        res = {
            "successful": False,
            "message": "Invalid login details"
        }
        res = json.dumps(res)
        return Response(res, status=400, mimetype='application/json')


@api.route("/userinfo", methods=['POST'])
def userinfo():
    req = request.json 
    res = {}

    if "userid" not in req.keys():
        res["successful"] = False
        res["message"] = "Did not receive userid"
        res = json.dumps(res)
        return Response(res, status=400, mimetype="application/json")
    
    else:
        result = getUser(req["userid"])
        if result is not None:
            res["successful"] = True
            res["name"] = result.name
            res["strengths"] = result.clifton.split(" ")
            res["interests"] = result.interests.split(" ")
            res["favourites"] = result.favourites.split(" ")
            res = json.dumps(res)

    return Response(res, status=200, mimetype='application/json')


@api.route("/")
def serverCheck():
    """Return a friendly HTTP greeting."""
    return "Server Running"

