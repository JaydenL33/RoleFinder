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


def buildJobSearchQuery(strengths, keywords=None, location=None, careerLevel=None, department=None, favourites=None):
    
    # Fields to search for keywords in
    keyword_search_fields = [
        'Description', 
        'AssignmentTitle^3', 
        'TalentSegment^3'
    ]

    similar_doc_search_fields = [
        'Description',
        'AssignmentTitle^3',
    ]

    # Fields to search for user strengths in
    user_strengths_search_fields = [
        'Quadrant1^2', 
        'Quadrant2'
    ]

    must_condition = []
    filter_condition = []
    should_condition = []    
    favourites_condition = []

    must_condition.append(
        {'multi_match': {'query': strengths, 'fields': user_strengths_search_fields, '_name': 'strengths'}}
    )
    
    if keywords is not None and len(keywords)>0:
        keywords = " ".join(keywords)
        filter_condition.append(
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

    if favourites is not None:
        like_condition = []
        for fav in favourites:
            like_condition.append({
                "_index":"joblistings", 
                "_id":fav
            })

        favourites_condition = {'more_like_this': {'fields': similar_doc_search_fields, "like": like_condition, '_name': 'favourites'}}
    
    else:
        favourites_condition = None

    query = {
        'query': {
            'bool':{
                'must': must_condition,
                'should': favourites_condition,
                'filter': {
                    'bool': {
                        'must': filter_condition
                    }
                }
            }
        },
        'size': 1000
    }
        
    
    return query


    
def buildJobSearchByIDQuery(jobids):

    if jobids is not None:
        query = {
            'query': {
                'ids':{
                    'values': jobids
                     
                }
            }
        }
        return query
    else:
        return None 
