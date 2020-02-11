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
	data = pd.read_csv(filename + '.csv', sep=',', low_memory=False)
	data = data.duplicates(subset=None, keep='first')

	np.savetxt("Cleaned_Roles.csv", data, delimiter=",")

	AssignmentTitle = data['Assignment Title']



filename = "CSV_Roles"
DataClean(filename)