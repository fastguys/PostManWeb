import { Paper, MenuList, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";


function Sidebar({user}) {
  

  

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Paper sx={{ width: "90%", height: "90%" }}>
        <Box
          sx={{
            width: "50%",
            height: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            p: 2,
            ml: 2,
            borderBottom: 1,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Chat
          </Typography>
        </Box>
        <MenuList>
          <MenuItem>User 1</MenuItem>
          <MenuItem>User 2</MenuItem>
          <MenuItem>User 3</MenuItem>
        </MenuList>
      </Paper>
    </Box>
  );
}

export default Sidebar;
