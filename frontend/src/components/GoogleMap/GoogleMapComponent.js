import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px'
};
  
const center = {
    lat: -33.865143,
    lng: 151.209900
};

function GoogleMapComponent({coordinates, setCoordinates}) {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })
  
    const [map, setMap] = React.useState(null);
  
    const onLoad = React.useCallback(function callback(map) {
      // const bounds = new window.google.maps.LatLngBounds();
      // map.fitBounds(bounds);
      setMap(map)
    }, []);
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, []);

    const onRightClickChange = (e) => {
      setCoordinates({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}

          center={center}
          zoom={4}
          onRightClick={onRightClickChange}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={coordinates} />
        </GoogleMap>
    ) : <></>
  }
  
  export default React.memo(GoogleMapComponent);