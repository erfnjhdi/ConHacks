let map;
let center;
var markers = [];



async function initMap() {

  const { Map } = await google.maps.importLibrary("maps");

  center = { lat:45.4978489, lng: -73.569564};
  map = new Map(document.getElementById("map"), {
    center: center,
    zoom: 13,
    styles: [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill"
        },
        {
            "featureType": "landscape",
            "elementType": "all"
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all"
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#80dfff"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ]
  });

//   markers.push({lat:45.51049728732744, lng: -73.56678128242493});
    
  getLocations();

  for(let i = 0; i < markers.length; i++){
    const marker = new google.maps.Marker({
        position: {lat:markers[0]['lat'], lng: markers[0]['lng']},
        map:map
      });

  }
  

//   findPlaces();
}



async function getLocations(){
    try{
        const response = await fetch("https://gbfs.velobixi.com/gbfs/en/station_information.json");
        if(!response.ok){
            throw new Error("could not fetch resource");
        }

        const data = await response.json();
        
        
            markers.push({lat:data.data.stations[0].lat, lng:data.data.stations[0].lon});
            console.log(markers.length);
        

        console.log(data.data.stations[0]);
    }catch(error){
        console.error(error);
    }
}

//  
async function findPlaces() {
  const { Place } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const request = {
    textQuery: "bixi stations",
    fields: ["displayName", "location"],
    includedType: "",
    locationBias: { lat:45.4978489, lng: -73.569564 },
    isOpenNow: true,
    language: "en-US",
    maxResultCount: 8,
    minRating: 3.2,
    region: "us",
    useStrictTypeFiltering: false,
  };
  //@ts-ignore
  const { places } = await Place.searchByText(request);

  if (places.length) {
    console.log(places);

    const { LatLngBounds } = await google.maps.importLibrary("core");
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
      const markerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
      });

      bounds.extend(place.location);
      console.log(place);
    });
    map.fitBounds(bounds);
  } else {
    console.log("No results");
  }
}