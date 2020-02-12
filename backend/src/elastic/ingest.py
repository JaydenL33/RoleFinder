# script to ingest a csv file into an elastic search server

from elasticsearch import Elasticsearch
import pandas as pd


es = Elasticsearch('http://localhost:9200')

es.indices.delete('joblistings')
df = pd.read_csv('../../data/roles.csv')
df.fillna('', inplace=True)

for idx, row in df.iterrows():
    document = {
        'AssignmentFulfillmentEntity1': row['Assignment Fulfillment Entity 1'],
        'AssignmentFulfillmentEntity2': row['Assignment Fulfillment Entity 2'],
        'CareerTrack': row['Career Track'],
        'Location': row['Source Location'],
        'AssignmentTitle': row['Assignment Title'],
        'Description': row['Description'],
        'StartDate': row['Requested Start Date'],
        'EndDate': row['End Date'],
        'Status': row['Status'],
        'CareerLevelFrom': row['Career Level From'],
        'CareerLevelTo': row['Career Level To'],
        'TalentSegment': row['Talent Segment'],
        'AssignedRole': row['Assigned Role'],
        'Quadrant1': row['Quadrant 1'],
        'Quadrant2': row['Quadrant 2'],
    }
    print(idx)

    es.index(index='joblistings', id=idx, body=document)



