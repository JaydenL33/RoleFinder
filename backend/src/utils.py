from .models import User

def isLegitLogin(user, password):
    namecheck = User.query.filter_by(username=user).first()

    if namecheck is None:
        return False
    if namecheck.pw == password:
        return True
    return False


def getUser(userid):
    query = User.query.filter_by(username=userid).first()
    return query


def buildJobSearchQuery(strengths, keywords=None, location=None, careerLevel=None, department=None):
    
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

    must_condition = []
    filter_condition = []    

    must_condition.append(
        {'multi_match': {'query': strengths, 'fields': user_strengths_search_fields, '_name': 'strengths'}}
    )
    
    if keywords is not None:
        keywords = " ".join(keywords)
        must_condition.append(
            {'multi_match': {'query': keywords, 'fields': keyword_search_fields, '_name': 'keywords'}}
        )

    if location is not None:
        filter_condition.append(
            {'match': {'Location': location}}
        )
    
    if careerLevel is not None:
        filter_condition.append({'range': {'CareerLevelFrom': {"gte": careerLevel}}})
        filter_condition.append({'range': {'CareerLevelTo': {"lte": careerLevel}}})

    if department is not None:
        filter_condition.append(
            {'match': {'AssignmentFulfillmentEntity1': department}}
        )

    query = {
        'query': {
            'bool':{
                'must': must_condition,
                'filter': {
                    'bool': {
                        'must': filter_condition
                    }
                }
            }
        }
    }
    return query


    


    # must_search = {
    #     'must': [  
    #         {'multi_match': {'query': user_strengths, 'fields': user_strengths_search_fields, '_name': 'strengths'}}, 
    #     ]
    # }

    # filter_search = {}
    




    # query = {
    #     'query': {
    #         'bool':{
    #             'must': [  
    #                 {'multi_match': {'query': user_strengths, 'fields': user_strengths_search_fields, '_name': 'strengths'}}, 
    #                 {'multi_match': {'query': 'java', 'fields': keyword_search_fields, '_name': 'keywords'}},
    #             ] ,
    #             'filter': 
    #         }
    #     }
    # }