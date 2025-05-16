
import { useEffect, useRef } from 'react';
import { Destination } from '@/components/destinations';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DestinationMapProps {
  destinations: Destination[];
}

// Initialize coordinates for Indonesia center
const INDONESIA_CENTER: L.LatLngTuple = [-2.5489, 118.0149]; // Latitude, longitude as tuple
const DEFAULT_ZOOM = 5;

const DestinationMap = ({ destinations }: DestinationMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Sample coordinates for destinations (in real app, these would come from the database)
  const destinationCoordinates: Record<string, L.LatLngTuple> = {
    'borobudur': [-7.6079, 110.2038],
    'raja-ampat': [-0.5897, 130.1403],
    'komodo': [-8.5852, 119.4412],
    'bali': [-8.3405, 115.0920],
    'prambanan': [-7.7520, 110.4914],
    'tana-toraja': [-3.0374, 119.8624]
  };

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current && mapContainerRef.current) {
      // Initialize map
      mapRef.current = L.map(mapContainerRef.current).setView(INDONESIA_CENTER, DEFAULT_ZOOM);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing markers if map exists
    if (mapRef.current) {
      // Clear any existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });

      // Add markers for each destination
      destinations.forEach(destination => {
        const coords = destinationCoordinates[destination.id];
        
        if (coords) {
          // Create custom icon
          const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="background-color: #2B6CB0; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; border: 2px solid white;">
                <span>${destination.name[0]}</span>
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          // Create popup content
          const popupContent = `
            <div style="width: 200px;">
              <img src="${destination.image}" alt="${destination.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px;" />
              <h3 style="font-weight: bold; margin: 8px 0 4px 0;">${destination.name}</h3>
              <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">${destination.location}</p>
              <p style="font-size: 13px; margin: 0;">${destination.description.substring(0, 100)}...</p>
            </div>
          `;

          // Add marker with popup
          L.marker(coords, { icon: customIcon })
            .addTo(mapRef.current!)
            .bindPopup(popupContent);
        }
      });
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [destinations]);

  return (
    <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
  );
};

export default DestinationMap;
