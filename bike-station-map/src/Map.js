import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const stationData = [
  { id: 1, name: "McTavish / Sherbrooke", lat: 45.5017, lng: -73.5673, bikes: 13, docks: 41 },
  { id: 2, name: "Peel / Maisonneuve", lat: 45.503, lng: -73.573, bikes: 8, docks: 20 },
  { id: 3, name: "Guy / Ste-Catherine", lat: 45.495, lng: -73.578, bikes: 5, docks: 30 }
];

const Map = ({ searchQuery }) => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    setStations(stationData);
  }, []);

  // Filter stations based on search query
  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MapContainer center={[45.5017, -73.5673]} zoom={13} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredStations.map(station => (
        <Marker key={station.id} position={[station.lat, station.lng]}>
          <Popup>
            <strong>{station.name}</strong> <br />
            Bikes: {station.bikes} <br />
            Docks: {station.docks}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;