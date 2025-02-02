import json


station_information = json.loads(open('data/station_information.json').read())
station_status = json.loads(open('data/station_status.json').read())
system_information = json.loads(open('data/system_information.json').read())
System_alerts = json.loads(open('data/system_alerts.json').read())

print(station_information)