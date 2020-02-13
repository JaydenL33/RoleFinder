"""
Last Updated : 12/02/2020
Purpose: To translate 'Clifton Strengths' to 'Gallup Strengths' and then sort them to from Tagged roles into 
the existing Cleanred Roles.CSV  

Authors: Jayden Lee
"""

# imports
import numpy as np
import pandas as pd
from datetime import datetime as dt

TaggedRolesFileName = "TaggedRoles"

def Translator(filename):
	data = pd.read_csv(filename + '.csv', encoding = 'utf8')
	# First Row Duplication Detection. 
	data = data.drop_duplicates()
	pd.set_option('display.width', 0)

	InfluencingToGallop = "Activator Command Communication Competition Self-Assurance Significance Woo"
	StrategicToGallop = "Analytical Context Futuristic Ideation Input Intellection Learn Strategic"
	Relationship_BuildingToGallup = "Adaptability Connectedness Developer Empathy Harmony Includer Individualization Positivity Relator"
	ExecutingToGallop = "Achiever Arranger Belief Consistency Discipline Focus Responsibility Restorative"

	for index, row in data.iterrows():
		if row['Quadrant 1'] == "Influencing":
			row['Quadrant 1'] = InfluencingToGallop
		elif row['Quadrant 1'] == "Strategic":
			row["Quadrant 1"] = StrategicToGallop
		elif row['Quadrant 1'] == "Relationship Building":
			row['Quadrant 1'] = Relationship_BuildingToGallup
		else:
			row["Quadrant 1"] = ExecutingToGallop 
	for index, row in data.iterrows():
			if row['Quadrant 2'] == "Influencing":
				row['Quadrant 2'] = InfluencingToGallop
			elif row['Quadrant 2'] == "Strategic":
				row["Quadrant 2"] = StrategicToGallop
			elif row['Quadrant 2'] == "Relationship Building":
				row['Quadrant 2'] = Relationship_BuildingToGallup
			else:
				row["Quadrant 2"] = ExecutingToGallop 


	print(data)

	return data


	

def DataAppend(Tagged):
	Roles = pd.read_csv("Cleaned_Roles.csv", encoding='utf8')
	Roles.insert(len(Roles.columns), "Quadrant 1", "Blank", True)
	Roles.insert(len(Roles.columns), "Quadrant 2", "Blank", True)
	for index, row in Roles.iterrows():
		for taggedIndex, taggedRow in Tagged.iterrows():
			if taggedRow["Assigned Role"] == row["Assigned Role"]:
				row["Quadrant 1"] = str(taggedRow["Quadrant 1"])
				row["Quadrant 2"] = str(taggedRow["Quadrant 2"])
				print("Done:" str(index)
	print(Roles)
	
	Roles.to_csv("AssignRolesTagged.csv", index=False)
				
	




TaggedRolesFileName = "TaggedRoles"
Tagged = Translator(TaggedRolesFileName)
DataAppend(Tagged)