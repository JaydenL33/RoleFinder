from torch.utils.data import Dataset
import pandas as pd

class CliftonStrengthsDataset(Dataset):
    def __init__(data="./employee_strengths_train.csv"):
