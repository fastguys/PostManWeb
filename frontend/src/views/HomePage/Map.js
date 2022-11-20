import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
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
    libraries: ["places"],
  });

  const handleSearch = () => {
    console.log();
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Autocomplete>
        <TextField
          sx={{ width: "100%", marginBottom: 1 }}
          id="outlined-basic"
          label="Enter address you want to search for task..."
          variant="outlined"
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
                  backgroundColor: "grey",
                  whiteSpace: "nowrap",
                  display: "block",
                  color: "black",
                  textTransform: "none",
                }}
              >
                Search
              </Button>
            ),
          }}
        />
      </Autocomplete>
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
