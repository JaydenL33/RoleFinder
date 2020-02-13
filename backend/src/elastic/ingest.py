# script to ingest a csv file into an elastic search server

from elasticsearch import Elasticsearch
import pandas as pd

es = Elasticsearch('http://localhost:9200')

es.indices.delete('joblistings')
df = pd.read_csv('../../data/roles.csv')
df.fillna('', inplace=True)

for idx, row in df.iterrows():
    try:
        careerlevelfrom = int(row['Career Level From'])
    except ValueError: 
        careerlevelfrom = 20
        print("Invalid career level")
    
    try:
        careerlevelto = int(row['Career Level To'])
    except ValueError: 
        careerlevelto = 0
        print("Invalid career level")

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
        'CareerLevelFrom': careerlevelfrom,
        'CareerLevelTo': careerlevelto,
        'TalentSegment': row['Talent Segment'],
        'AssignedRole': row['Assigned Role'],
        'Quadrant1': row['Quadrant 1'],
        'Quadrant2': row['Quadrant 2'],
    }
    print(idx)

    es.index(index='joblistings', id=idx, body=document)



