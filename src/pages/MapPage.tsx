import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card } from '../components/ui/Card';
import 'leaflet/dist/leaflet.css';

// Component to handle geolocation
const LocateUser: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // Try to get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 14); // Zoom to user's location
        // Add a marker for the user's location
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup('You are here!')
          .openPopup();
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Fallback to Mirissa if geolocation fails
        map.setView([5.9485, 80.4703], 14);
      }
    );
  }, [map]);

  return null;
};

const MapPage: React.FC = () => {
  // Fix for Leaflet marker icons
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="min-h-screen p-6">
      <Card className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Your Location</h2>
        <MapContainer
          center={[5.9485, 80.4703]} // Default to Mirissa
          zoom={14}
          style={{ height: '24rem', width: '100%', borderRadius: '0.5rem' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocateUser />
        </MapContainer>
      </Card>
    </div>
  );
};

export default MapPage;