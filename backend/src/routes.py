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
    


# @api.route('/jobsearch', methods=['GET'])
# def job_search():
#     req = request.json 

#     res = [{
#         "job-match-score": 96.8, 
#         "city": "London",
#         "country": "United Kingdom", 
#         "assignment-title": "Instructional Designer",
#         "description": "Develop and/or manage the development of training solutions using prescribed tools. Follow Content Development Center process, quality, budget and milestone standards. Implement the overall instructional design of learning products developed in the Content Development Center ensuring that projects successfully evolve from sponsor/stakeholders expectations through the development of assets and their effective and efficient deployment.",
#         "project-supervising-entity": "Products",
#         "sold": True,
#         "client-contract-based": False,
#         "requested-start-data": "6-Feb-20",
#         "end-date": "6-Mar-20",
#         "status": "Open",
#         "talent-segment": "Business Process Specialization", 
#         "assigned-role": "Instructional designer",
#     }, {
#         "job-match-score": 92.1, 
#         "city": "London",
#         "country": "United Kingdom", 
#         "assignment-title": "Application Developer",
#         "description": "Develop and/or manage the development of training solutions using prescribed tools. Follow Content Development Center process, quality, budget and milestone standards. Implement the overall instructional design of learning products developed in the Content Development Center ensuring that projects successfully evolve from sponsor/stakeholders expectations through the development of assets and their effective and efficient deployment.",
#         "project-supervising-entity": "Products",
#         "sold": True,
#         "client-contract-based": False,
#         "requested-start-data": "10-Feb-20",
#         "end-date": "10-Mar-20",
#         "status": "Open",
#         "talent-segment": "Business Process Specialization", 
#         "assigned-role": "Application Developer",
#     }]

#     res = json.dumps(res)
#     res = Response(res, status=200, mimetype="application/json")
#     return res



@api.route("/")
def serverCheck():
    """Return a friendly HTTP greeting."""
    return "Server Running"


# @api.route("/algorithm_test")
# def algorithmTest():
#     # Processing
#     magic_number = 32
#     result= algorithm(magic_number)
#     return f"Result: {result}, Status: {message}"


# # Only use when first run -> init or potentially reset database
# @api.route("/create_table", methods=["POST"])
# def debug():
#     admin_info = request.get_json()
#     username = admin_info["username"]
#     password = admin_info["password"]
#     message = ""
#     if (username == "admin") and (password == "db_init"):
#         db.create_all()
#         message = "Init Successful"
#     else:
#         message = "Init Fail"
#     return jsonify(message), 201


# @api.route("/add_task", methods=["POST"])
# def add_task():
#     task_info = request.get_json()

#     userid = task_info["userid"]
#     batchid = task_info["batchid"]
#     path = task_info["path"]
#     vineyard = task_info["vineyard"]
#     block = task_info["block"]
#     variety = task_info["variety"]
#     el_stage = task_info["el_stage"]
#     date = task_info["date"]
#     date = datetime.strptime(date, "%Y-%m-%d").date()
#     name = task_info["name"]

#     # Delete duplicate records
#     old_tasks = (
#         db.session.query(Images)
#         .filter_by(userid=userid)
#         .filter_by(path=path)
#         .filter_by(name=name)
#     )

#     for task in old_tasks:
#         if task.status != "deleted":
#             task.status = "deleted"
#     db.session.commit()

#     # Add record in database
#     new_task = Images(
#         userid=userid,
#         batchid=batchid,
#         path=path,
#         vineyard=vineyard,
#         block=block,
#         variety=variety,
#         el_stage=el_stage,
#         date=date,
#         name=name,
#     )
#     db.session.add(new_task)
#     db.session.commit()

#     # Processing
#     result= algorithm(magic_number)
#     # result = 1

#     label = f"{variety}@{el_stage}"
#     params = Parameters.query.filter_by(label=label).first()
#     if params:
#         slope = float(params.slope)
#         intercept = float(params.intercept)
#         message = "model found"
#         # slope = 100
#         # intercept = 0
#     else:
#         slope = 1
#         intercept = 0
#         message = "model not exists"

#     estimate = result * slope + intercept

#     # Update database
#     # setattr(new_task, "result", "processed")
#     new_task.status = "processed"
#     new_task.result = float(result)
#     new_task.estimate = float(estimate)
#     db.session.commit()

#     return jsonify(
#         {"id": new_task.id, "result": result, "message": message, "estimate": estimate}
#     )
#     # return jsonify({"status": "success"}), 201


# @api.route("/report", methods=["POST"])
# def get_report():
#     batch_info = request.get_json()
#     userid = batch_info["userid"]
#     batchid = batch_info["batchid"]
#     email = batch_info["email"]
#     # date = batch_info["date"]
#     # variety = batch_info["variety"]
#     # el_stage = batch_info["el_stage"]
#     # vineyard = batch_info["vineyard"]
#     # block = batch_info["block"]
#     sendEmail = batch_info["sendEmail"]

#     if userid:
#         # path = f"images/{userid}/{vineyard}/{block}/{variety}@{el_stage}/{date}/"
#         task_list = (
#             db.session.query(Images)
#             .filter_by(userid=userid)
#             .filter_by(batchid=batchid)
#             .filter(Images.status != "deleted")
#             .filter(Images.status != "uploaded")
#             .all()
#         )
#     else:
#         # path = f"images/guest/{email}/{vineyard}/{block}/{variety}@{el_stage}/{date}/"
#         task_list = (
#             db.session.query(Images)
#             .filter_by(userid=email)
#             .filter_by(batchid=batchid)
#             .filter(Images.status != "deleted")
#             .filter(Images.status != "uploaded")
#             .all()
#         )

#     results = []
#     for task in task_list:
#         results.append(float(task.result))

#     summary = summarize(results)

#     if sendEmail:
#         summary["batch_info"] = batch_info
#         email_message(summary)

#     return jsonify({"summary": summary}), 201


# @api.route("/delete", methods=["POST"])
# def delete_target():
#     request_info = request.get_json()
#     userid = request_info["uid"]
#     delete_type = request_info["type"]

#     # Query object containing all records for this user
#     user_records = (
#         db.session.query(Images)
#         .filter_by(userid=userid)
#         .filter(Images.status != "deleted")
#         .filter(Images.status != "uploaded")
#     )

#     records_to_delete = []
#     if delete_type == "vineyard":
#         vineyard_name = request_info["name"]
#         records_to_delete = user_records.filter_by(vineyard=vineyard_name)
#     elif delete_type == "block":
#         vineyard = request_info["vineyard"]
#         block_name = request_info["name"]
#         records_to_delete = user_records.filter_by(vineyard=vineyard).filter_by(
#             block=block_name
#         )
#     elif delete_type == "dataset":
#         vineyard = request_info["vineyard"]
#         block = request_info["block"]
#         dataset_name = request_info["name"]
#         records_to_delete = (
#             user_records.filter_by(vineyard=vineyard)
#             .filter_by(block=block)
#             .filter_by(batchid=dataset_name)
#         )
#     elif delete_type == "image":
#         vineyard = request_info["vineyard"]
#         block = request_info["block"]
#         batchid = request_info["dataset"]
#         image_name = request_info["name"]
#         records_to_delete = (
#             user_records.filter_by(vineyard=vineyard)
#             .filter_by(block=block)
#             .filter_by(batchid=batchid)
#             .filter_by(name=image_name)
#         )
#     else:
#         return jsonify("Invalid Delete Target")

#     for record in records_to_delete:
#         record.status = "deleted"
#     db.session.commit()
#     return (jsonify("Target deleted"), 201)


# @api.route("/results/<userid>")
# def results(userid):
#     if userid == "admin":
#         task_list = Images.query.all()
#     else:
#         task_list = Images.query.filter_by(userid=userid).all()

#     results = []
#     for task in task_list:
#         results.append(
#             {"name": task.name, "status": task.status, "result": float(task.result)}
#         )
#     return jsonify({"results": results}), 201


# @api.route("/reset", methods=["POST"])
# def reset_database():
#     admin_info = request.get_json()
#     username = admin_info["username"]
#     password = admin_info["password"]
#     if (username == "admin") and (password == "reset"):
#         Images.query.delete()
#         # db.session.query(Model).delete()
#         db.session.commit()

#     return jsonify("success"), 201
