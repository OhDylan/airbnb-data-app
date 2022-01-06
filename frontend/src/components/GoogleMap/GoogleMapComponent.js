import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};
  
const center = {
    lat: 40.730610,
    lng: -73.935242
};

function GoogleMapComponent({setCoordinates}) {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyDl8sghFD9xUwEYi26gqkAk5hguQDvB3-k"
    })
  
    const [map, setMap] = React.useState(null)
    const [position, setPosition] = useState({})
  
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    const onRightClickChange = (e) => {
      setCoordinates({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      })
      setPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onRightClick={onRightClickChange}
        >
          <Marker position={position} />
          <></>
        </GoogleMap>
    ) : <></>
  }
  
  export default React.memo(GoogleMapComponent)