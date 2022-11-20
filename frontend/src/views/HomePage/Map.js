import { Box } from "@mui/system";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
const center = { lat: 48.8584, lng: 2.2945 };

function Map() {
  //MAPS API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDHcel8Zif6__KnyYRvsxHCIELH4kCRTTA",
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "primary.main",
        borderRadius: 2,
      }}
    >
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Marker position={center} />
      </GoogleMap>
    </Box>
  );
}
export default Map;
