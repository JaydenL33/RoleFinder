"""
Last Updated : 11/02/2020
Purpose: To modified CSV files and standardise CSVs.  

Authors: Jayden Lee
"""

# imports
import numpy as np
import pandas as pd
from datetime import datetime as dt



def DataClean(filename):
	data = pd.read_csv(filename + '.csv', encoding = 'utf8')
	# First Row Duplication Detection. 
	data = data.drop_duplicates()
	# Drops Un-nessecrary Columns
	data = data.drop(["Skill & Proficiency", "Candidates"], axis=1)

	pd.set_option('display.width', 10) 
	# ^ Print Display width for DF. 

	# Duplication Detection.
	indexAssignmentTitle = data[data['Assignment Title'].str.contains("Copy")].index
	data.drop(indexAssignmentTitle, inplace=True)
	

	indexDuplicated = data[data.duplicated()].index

	# Duplication Deleted. 
	
	data.drop(indexDuplicated, inplace=True)
	
	# Debug Print
	print("Length of Data is " + str(len(data)))
	data.to_csv("Cleaned_Roles.csv", index=False)
	print ("Success!")




filename = "CSV_Roles"
DataClean(filename)