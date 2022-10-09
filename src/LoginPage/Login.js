import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const auth = getAuth();
    let errorMessage = '';
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("./homepage");
      })
      .catch((error) => {
        const errorCode = error.code;
        errorMessage = error.message;
      });
      if (errorMessage !== '') {
        setLoginError(true);
      }

  };
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
          value={email}
          required
          fullWidth
          error={loginError}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setLoginError(false)
          }}
          sx={{ mt: 1, mb: 1 }}
        />

        <TextField
          value={password}
          required
          error={loginError}
          helperText={loginError ? "Incorrect email or password" : ""}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginError(false)
          }}
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

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, mr: 2, width: 100, backgroundColor: "#656268" }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Login
        </Button>
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
