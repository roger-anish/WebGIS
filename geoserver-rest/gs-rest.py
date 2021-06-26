# Import the library
from geo.Geoserver import Geoserver

# Initialize the library
geo = Geoserver('http://127.0.0.1:8585/geoserver', username='admin', password='geoserver')

# For creating workspace
# geo.create_workspace(workspace='geodjango2021')

#creating coveragestores
# geo.create_coveragestore(lyr_name='Jhapa', path=r'D:\ANISH\MyProject\geodjango2021\geoserver-rest\data\raster\addddd.tif', workspace='geodjango2021', overwrite=True)

# Creating and publishing featurestores and featurestore layers
# geo.create_featurestore(store_name='postgis', workspace='geodjango2021', db='postgres', host='127.0.0.1', pg_user='postgres', pg_password='roger')
# geo.publish_featurestore(workspace='geodjango2021', store_name='postgis', pg_table='district')