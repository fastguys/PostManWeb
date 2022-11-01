import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function LeftMessage({ message }) {
  const image = useSelector((state) => state.chat.image);
  return (
    <List
      sx={{
        alignSelf: "flex-end",
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start">
        <Box
          sx={{
            padding: 2,
            mx: 2,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightblue",
            borderRadius: 2,
          }}
        >
          {message}
        </Box>
        <ListItemAvatar sx={{ alignItems: "flex-start", my: 0.5 }}>
          <Avatar
            alt="Remy Sharp"
            src={image ? image : "/static/images/avatar/2.jpg"}
          />
        </ListItemAvatar>
      </ListItem>
    </List>
  );
}

export default LeftMessage;
