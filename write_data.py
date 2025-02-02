import requests
from influxdb_client import InfluxDBClient, Point, WriteOptions
import certifi
import schedule
import time

# Function to fetch and write data to InfluxDB
def fetch_and_write_data():
    print("Fetching and writing station data...")

    # Fetch station status data
    status_url = "https://gbfs.velobixi.com/gbfs/en/station_status.json"
    status_response = requests.get(status_url, verify=False)
    if status_response.status_code == 200:
        status_data = status_response.json()
    else:
        print(f"Station status API request failed with status code: {status_response.status_code}")
        return

    if "data" in status_data and "stations" in status_data["data"]:
        status_stations = status_data["data"]["stations"]
    else:
        print("Unexpected station status JSON structure.")
        return

    # Fetch station information data
    info_url = "https://gbfs.velobixi.com/gbfs/en/station_information.json"
    info_response = requests.get(info_url, verify=False)
    if info_response.status_code == 200:
        info_data = info_response.json()
    else:
        print(f"Station information API request failed with status code: {info_response.status_code}")
        return

    if "data" in info_data and "stations" in info_data["data"]:
        info_stations = info_data["data"]["stations"]
    else:
        print("Unexpected station information JSON structure.")
        return

    station_info_map = {station["station_id"]: station for station in info_stations}

    # InfluxDB connection details
    influx_url = "https://us-east-1-1.aws.cloud2.influxdata.com"
    token = "pIJU8NM6hcbTPg0HZs_t87Dvzp4IfBni1yrFEB3f1vQ-WCURff5KFmNLWzTGmaC2LBEBT4Rty5_QmBic1AV3Cw=="
    org = "aw"
    bucket = "bixi_data"

    with InfluxDBClient(url=influx_url, token=token, org=org, verify_ssl=False) as client:
        with client.write_api(write_options=WriteOptions(batch_size=500)) as write_api:
            for station in status_stations:
                station_id = station["station_id"]
                if station_id in station_info_map:
                    info = station_info_map[station_id]
                    point = Point("station_status") \
                        .tag("station_id", station_id)
                    for field in ["name", "lat", "lon"]:
                        point = point.field(field, info.get(field))
                    for field in ["num_bikes_available", "num_ebikes_available", "num_bikes_disabled", "num_docks_available", "num_docks_disabled", "is_installed", "is_renting", "is_returning"]:
                        if field in station:
                            point = point.field(field, station[field])
                    print("Writing point:", point)
                    write_api.write(bucket=bucket, record=point)

    print("Data successfully written to InfluxDB!")

# Schedule the task to run every 5 minutes
schedule.every(1).minutes.do(fetch_and_write_data)

print("Scheduler is running...")

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)
