"""
Last Updated : 10/02/2020
Purpose: To modified CSV files and standardise CSVs.  

Authors: Jayden Lee
"""

# imports
import numpy as np
import pandas as pd
from datetime import datetime as dt



def DataClean(filename):
	data = pd.read_csv(filename + '.csv', encoding = 'utf8')

	data = data.drop_duplicates()
	data = data.drop(["Skill & Proficiency", "Candidates"], axis=1)
	pd.set_option('display.width', 10)

	indexAssignmentTitle = data[data['Assignment Title'].str.contains("Copy")].index

	data.drop(indexAssignmentTitle, inplace=True)

	print(len(data))
	data.to_csv("Cleaned_Roles.csv", index=False)




filename = "CSV_RolesFixed"
DataClean(filename)