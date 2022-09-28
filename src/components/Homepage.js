import { Box } from "@mui/material";
import { width } from "@mui/system";
import React from "react";
import Login from "./Login";

function Homepage() {
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 700, height: 100, border: 1, mb: 5 }} />
          <Box sx={{ width: 700, height: 400, border: 1 }} />
        </Box>

        <Box
          sx={{
            width: "40%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 300, height: 600, padding: 10}}>
            <Login />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
