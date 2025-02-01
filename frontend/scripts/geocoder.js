const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

map.addControl(geocoder);

geocoder.on('result', (e) => {
    const { result } = e;
    const marker = new mapboxgl.Marker()
        .setLngLat(result.center)
        .addTo(map);

    const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${result.place_name}</h3>`);
    marker.setPopup(popup);
});