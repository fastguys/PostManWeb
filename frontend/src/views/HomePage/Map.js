import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Marker,
  Autocomplete,
  DirectionsRenderer
} from '@react-google-maps/api';
const Markers = (props) => {
  // return the markers from the mapped array
  return props.taskList.map((task, index) => {
    // TODO: adjust the coordinates later
    return (
      <Marker
        key={index}
        position={{ lat: task.location.coordinates[0], lng: task.location.coordinates[1] }}
        onClick={() => props.onMarkerClick(index)}
      />
    );
  });
};

const Map = (props) => {
  //MAPS API
  const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 });
  const [zoom, setZoom] = useState(10);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDHcel8Zif6__KnyYRvsxHCIELH4kCRTTA',
    libraries: ['places']
  });
  const addressRef = useRef();
  const [map, setMap] = useState(null);

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: addressRef.current.value }, (results, status) => {
      if (status === 'OK') {
        const position = results[0].geometry.location;
        setCenter({ lat: position.lat(), lng: position.lng() });
        setZoom(15);
      }
    });
  };

  // substitute with real data
  const mockupMarkers = [
    {
      lat: 48,
      lng: 2
    },
    {
      lat: 48.5,
      lng: 2.5
    },
    {
      lat: 49,
      lng: 3
    }
  ];


  const handleMarkerClick = (index) => {
    console.log(index);
    console.log(props.taskList[index]);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Autocomplete>
        <TextField
          sx={{ width: '100%', marginBottom: 1 }}
          id="outlined-basic"
          label="Enter address you want to search for task..."
          variant="outlined"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          inputRef={addressRef}
          InputProps={{
            endAdornment: (
              <Button
                onClick={() => {
                  handleSearch();
                }}
                sx={{
                  width: 100,
                  height: 55,
                  mr: -2,
                  backgroundColor: 'grey',
                  whiteSpace: 'nowrap',
                  display: 'block',
                  color: 'black',
                  textTransform: 'none'
                }}>
                Search
              </Button>
            )
          }}
        />
      </Autocomplete>
      <GoogleMap
        center={center}
        zoom={zoom}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        // onLoad={(map) => {
        //   setMap(map);
        // }}
      >
        {/* <MarkerF position={center} /> */}
        <Markers taskList={props.taskList} onMarkerClick={handleMarkerClick} />
      </GoogleMap>
    </Box>
  );
};
export default Map;
