mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fzc2FuZ2h6IiwiYSI6ImNtNm1ubXcyYTBsbWYybnE0aWF0NnkwNmkifQ.nRXv8m0gpOWHiaK4JqsSxw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0, 0],
    zoom: 1
});