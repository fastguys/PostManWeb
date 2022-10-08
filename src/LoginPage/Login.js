import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { auth } from "../firebase";

export default function Login() {
  const [loginError, setLoginError] = useState(false);
  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          borderRadius: 2,
          border: "1px solid #eaeaea",
        }}
      >
        <TextField
          required
          fullWidth
          error={loginError}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          sx={{ mt: 1, mb: 1 }}
        />

        <TextField
          required
          error={loginError}
          helperText={loginError ? "Incorrect email or password" : ""}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          sx={{ mt: 1, mb: 1 }}
        />

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
        <Link href="./homepage" sx={{ textDecoration: "none" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, mr: 2, width: 100, backgroundColor: "#656268" }}
            // onClick={() => {
            //   setLoginError(!loginError);
            // }}
          >
            Login
          </Button>
        </Link>

          <Link href="./signup" sx={{ textDecoration: "none" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: 100,
                color: "#656268",
                backgroundColor: "#FFFFFF",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>

        {/* Third party */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{ width: 50, height: 50, mr: 3, backgroundColor: "#eaeaea" }}
          ></Box>
          <Box
            sx={{ width: 50, height: 50, mr: 3, backgroundColor: "#eaeaea" }}
          ></Box>
          <Box
            sx={{ width: 50, height: 50, mr: 3, backgroundColor: "#eaeaea" }}
          ></Box>
          <Box sx={{ width: 50, height: 50, backgroundColor: "#eaeaea" }}></Box>
        </Box>
      </Box>
    </div>
  );
}
