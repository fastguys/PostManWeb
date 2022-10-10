import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../firebase";
import { InputAdornment } from '@mui/material';
import { SystemSecurityUpdate } from "@mui/icons-material";
import ResponsiveAppBar from "../TopBar/TopBar";
import { useState } from "react";
import { height } from "@mui/system";
import { Phone } from "@mui/icons-material";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PostMan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
export default function SignUp() {
  const [NameError, setNameError] = useState(false);
  const [PhoneError, setPhoneError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [EmailInUsed, setInUsed] = useState(false);
  const [IncorrectCode, setIncorrectCode] = useState(false);
  const [Phone, setPhone] = useState('+1');
  
  const handleClick = event => {
    const auth = getAuth();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('reCap', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      }, auth);
    }
    let phone_number = "+1" + Phone;
    console.log(phone_number)
    signInWithPhoneNumber(auth, phone_number, window.recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("A Code Sent Successfully to Your Phone")
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }
  const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            phone_number: data.get('phone_number'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName')
        });
        
        let email = data.get('email')
        let password = data.get('password')
        let phone_number = data.get('phone_number')
        let firstName = data.get('firstName')
        let lastName = data.get('lastName')
        let isnum = /^\d+$/.test(phone_number);
        setNameError(false)
        setPhoneError(false)
        setPasswordError(false)
        setEmailError(false)
        setInUsed(false)
        if (firstName.length == 0 || lastName.length == 0) {
          setNameError(true)
        } 
        if (isnum == false) {
          setPhoneError(true)
        }
        if (password.length < 6) {
          setPasswordError(true)
        } 
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              user.linkWithPhoneNumber(phone_number);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if (
                errorMessage ==
                "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
              ) {
                  setInUsed(true)
              } else if (errorMessage.includes("email")) {
                setEmailError(true)
              } 
              if (
                errorMessage ==
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
              ) {
                setPasswordError(true)
              }
              // ..
            });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ResponsiveAppBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={"/logo.svg"}
              alt="logo"
              style={{ width: 200, height: 185 }}
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error = {NameError}
                    helperText = {NameError ? "Name Can't be empty" : ""}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    error = {NameError}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error = {EmailError | EmailInUsed} 
                    helperText = {EmailError ? "Invalid email input" : EmailInUsed ? "Email Already In Used Try to Log in Instead": ""}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error = {PhoneError}
                    helperText = {PhoneError ? "Invalid Phone Number" : ""}
                    id="phone_number"
                    label="Phone number"
                    name="phone_number"
                    autoComplete="tel"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error = {PhoneError}
                    helperText = {PhoneError ? "Invalid Phone Number" : ""}
                    id="validation_code"
                    label="validation code"
                    name="validation_code"
                    autoComplete="tel"
                
                    InputProps={{endAdornment: (
                      <InputAdornment position="end">
                        <Button
                        onClick={() => {
                          handleClick();
                        }}
                        sx=
                        {{ width:100,
                          height:55,
                          mr : -2,
                          backgroundColor:"grey",
                          whiteSpace: "nowrap",
                          display: "block"
                        }}
                        >Send Code</Button> 
                      </InputAdornment>
                    )}}
                  />
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error = {PasswordError}
                    helperText = {PasswordError ? "Invalid Password:Password should be at least 6 character!" : ""}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid
                id = "reCap"
                >
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </Box>
  );
}
