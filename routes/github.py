
 
from pandas import Series, DataFrame
import pandas as pd
import numpy as np
import os
import matplotlib.pylab as plt
from sklearn.model_selection  import train_test_split
from sklearn.cluster import KMeans
import sklearn.metrics
 
raw_data = pd.read_csv("/home/sagarika12/Downloads/github1.csv")
from sklearn.preprocessing import LabelEncoder
labelencoder = LabelEncoder()

raw_data.iloc[:, 1] = labelencoder.fit_transform(raw_data.iloc[:, 1])
clust_data = raw_data.drop("email",axis=1)
#Optimal clusters is 3
final_model=KMeans(3)
final_model.fit(clust_data)
prediction=final_model.predict(clust_data)
 
#Join predicted clusters back to raw data
raw_data["GROUP"] = prediction
new_data = raw_data[["GROUP","email"]]
data1 = pd.DataFrame(new_data[new_data['GROUP']==1]).drop_duplicates()
data2 = pd.DataFrame(new_data[new_data['GROUP']==2]).drop_duplicates()
data3 = pd.DataFrame(new_data[new_data['GROUP']==3]).drop_duplicates()
result = {
    "one" : list(data1['email'].values),
    "two": list(data2['email'].values),
    "three": list(data3['email'].values)
}
import json
result1 = json.dumps(result)
print(result1)