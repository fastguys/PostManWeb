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
        backgroundColor: "grey",
        borderRadius: 2,
        alignSelf: "flex-end",
        marginRight: 5,
      }}
    >
      {message}
    </Box>
  );
}

export default LeftMessage;
