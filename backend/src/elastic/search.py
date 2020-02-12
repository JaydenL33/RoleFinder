# Elastic search related functions

from elasticsearch import Elasticsearch

es = Elasticsearch("http://localhost:9200")

x = es.search(index='joblistings', body={
    'query': {
        'multi_match': {
            'query':'woo strategic arranger empathy maximiser significance deliberative achiever ideation relator',
            'fields': ['Quadrant1^2', 'Quadrant2'],
        }
    }
})


print(x)


# def getMostRelevantListings(strengths, keywords, filters=None):
    