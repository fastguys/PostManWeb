import { Box } from '@mui/system';

function Message({ message }) {
  return (
    <Box
          sx={{
            width: 300,
            height: 20,
            margin: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            backgroundColor: "grey",
            borderRadius: 5,
          }}
        >
         { message }
        </Box>
  );
}

export default Message;
