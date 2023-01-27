import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';

const COMPANY_COORDS: [number, number] = [59.96831, 30.31749];


function Map(): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, COMPANY_COORDS);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      leaflet
        .marker({
          lat: COMPANY_COORDS[0],
          lng: COMPANY_COORDS[1],
        }, {
          icon: defaultCustomIcon,
        })
        .addTo(map);
    }
  }, [map]);


  return (
    <div
      className="map__container"
      style={{ height: '100%' }}
      ref={mapRef}
    />
  );
}

export default Map;
