import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import apis from "../../apis/user";

function LeftMessage({ message }) {
  const [image, setImage] = React.useState(null);
  let email = localStorage.getItem("userId");
  React.useEffect(() => {
    apis.FinduserByEmail({ email }).then((res) => {
      setImage(res[0].ImageUrl);
    });
  }, [image]);
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
            margin: 2,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightblue",
            borderRadius: 2,
          }}
        >
          {message}
        </Box>
        <ListItemAvatar sx={{ alignItems: "flex-start" }}>
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
