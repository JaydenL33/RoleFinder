"""
Last Updated : 11/02/2020
Purpose: HR is firing it's laser on inconsistancies in the Data Set.  

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
	pd.set_option('display.width', 10) 
	# ^ Print Display width for DF. 

	# Duplication Detection.
	index = data[data['Talent Segment'].str.contains("Performance, Risk & Quality|Portfolio & Delivery Management|Sales Enablement|Business Process Specialization|Business Process Delivery|Product, Service & Offering Development|Research", regex=True)].index
	data.drop(index, inplace=True)

	# Duplication Deleted. 
	
	# Debug Print
	print("Length of Data is " + str(len(data)))
	data.to_csv("Sanitised_Userbase.csv", index=False)
	print ("Success!")




filename = "Userbase"
DataClean(filename)