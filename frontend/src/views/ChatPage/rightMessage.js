import { Box } from "@mui/system";

function RightMessage({ message }) {
  return (
    <Box
      sx={{
        padding: 2,
        margin: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        borderRadius: 2,
        alignSelf: "flex-start",
        marginLeft: 5,
      }}
    >
      {message}
    </Box>
  );
}

export default RightMessage;
