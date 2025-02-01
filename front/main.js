function initMap(){

    const centerMap = { lat:45.4978489, lng: -73.569564}

    const mapOptions = {
        center: centerMap,
        zoom: 15,
        disableDefaultUI: true,
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
    }

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}