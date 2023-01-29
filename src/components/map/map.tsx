import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { COMPANY_COORDS, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';
import { Coords } from '../../types/coords';

type MapProps = {
  points: Coords[];
  selectedPoint?: Coords;
  getMarkerCoords?: (coords: Coords) => void;
}

function Map({ points, selectedPoint, getMarkerCoords }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, COMPANY_COORDS);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const compareCoords = (point: Coords) => {
    if (selectedPoint) {
      return point[0] === selectedPoint[0];
    }
    return false;
  };

  useEffect(() => {
    if (map) {
      points.forEach((point, i) => {
        leaflet
          .marker([
            point[0],
            point[1],
          ], {icon: compareCoords(point) ? currentCustomIcon : defaultCustomIcon})
          .addTo(map)
          .on('click', () => getMarkerCoords && getMarkerCoords(point));
      });
    }
    return () => {
      map?.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          layer.remove();
        }
      });
    };
  }, [map, points, selectedPoint]);

  return (
    <div
      className="map__container"
      style={{ height: '100%' }}
      ref={mapRef}
    />
  );
}

export default Map;
