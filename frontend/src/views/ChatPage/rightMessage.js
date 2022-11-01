import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import apis from "../../apis/user";

function RightMessage({ message, image }) {
  return (
    <List
      sx={{
        alignSelf: "flex-start",
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar sx={{ alignItems: "flex-start", my: 0.5 }}>
          <Avatar
            alt="Remy Sharp"
            src={image ? image : "/static/images/avatar/2.jpg"}
          />
        </ListItemAvatar>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "grey",
            borderRadius: 2,
          }}
        >
          {message}
        </Box>
      </ListItem>
    </List>
  );
}

export default RightMessage;
