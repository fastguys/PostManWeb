import { Box } from "@mui/system";


function LeftMessage({ message }) {


  return (
    <Box
    sx={{
      padding: 2,
      margin: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "lightblue",
      borderRadius: 2,
      alignSelf: "flex-end",
      marginRight: 5,
    }}>
    <Box
      sx={{
        padding: 2,
        margin: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        borderRadius: 2,
        alignSelf: "flex-end",
        marginRight: 5,
      }}
    >
      {message}
    </Box>
  </Box>
  );
}

export default LeftMessage;
