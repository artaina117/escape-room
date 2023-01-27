// import leaflet from 'leaflet';
import { useEffect, useRef } from 'react';
import { VIEW_ZOOM } from '../../const';
// import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT, VIEW_ZOOM } from '../../const';
import useMap from '../../hooks/use-map';

const COMPANY_COORDS: [number, number] = [59.96831, 30.31749];


function Map(): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, COMPANY_COORDS);

  // const defaultCustomIcon = leaflet.icon({
  //   iconUrl: URL_MARKER_DEFAULT,
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  // });

  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: URL_MARKER_CURRENT,
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  // });

  useEffect(() => {
    map?.setView({
      lat: COMPANY_COORDS[0],
      lng: COMPANY_COORDS[1],
    },
    VIEW_ZOOM
    );
  }, [map]);


  return (
    <div
      className="map__container"
      style={{height: '100%'}}
      ref={mapRef}
    />
  );
}

export default Map;
