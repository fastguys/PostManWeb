import React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {auth} from "../firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    OAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider
} from "firebase/auth";


export default function Login() {
    const [loginError, setLoginError] = useState(false);
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const msftProvider = new OAuthProvider('microsoft.com');
    const fbProvider = new FacebookAuthProvider();
    const ghProvider = new GithubAuthProvider();
    const ggProvider = new GoogleAuthProvider();
    const handleLoginSubmit = async (e) => {
        const auth = getAuth();
        let errorMessage = '';
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setauthenticated(true);
                localStorage.setItem("authenticated", true);
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

    const handleMicrosoftLogin = async (e) => {
        const auth = getAuth();
        signInWithPopup(auth, msftProvider)
            .then((result) => {
                // User is signed in.
                // IdP data available in result.additionalUserInfo.profile.

                // Get the OAuth access token and ID Token
                const credential = OAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const idToken = credential.idToken;
                localStorage.setItem("authenticated", true);
                navigate("./homepage");
            })
            .catch((error) => {
                // Handle error.
                console.log(error);
            });
    };

    //
    const handleFacebookLogin = async (e) => {
        const auth = getAuth();
        console.log(auth);
        signInWithPopup(auth, fbProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                localStorage.setItem("authenticated", true);
                console.log(user);
                // navigate to homepage
                navigate("./homepage");
                console.log("navigate to homepage");
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log(errorCode);
                // ...
            });
    };

    const handleGoogleLogin = async (e) => {
        const auth = getAuth();
        signInWithPopup(auth, ggProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                localStorage.setItem("authenticated", true);

                navigate("./homepage");
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };


    const handleGithubLogin = async (e) => {
        const auth = getAuth();
        console.log(auth);
        signInWithPopup(auth, ghProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                localStorage.setItem("authenticated", true);

                // ...
                navigate("./homepage");
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });
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
                    sx={{mt: 1, mb: 1}}
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
                    sx={{mt: 1, mb: 1}}
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
                        sx={{mt: 3, mb: 2, mr: 2, width: 100, backgroundColor: "#656268"}}
                        onClick={() => {
                            handleLoginSubmit();
                        }}
                    >
                        Login
                    </Button>
                    <Link href="./signup" sx={{textDecoration: "none"}}>
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
                <div>
                    {/* Added Microsoft OAuth */}
                    <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            handleMicrosoftLogin();
                        }}
                        startIcon={<img src={"./Microsoft.svg"} alt="microsoft"/>}
                        sx={{mx: 1, my: 1}}
                    >Continue with Microsoft</Button>
                </div>
                {/* TODO: Added Google OAuth */}
                <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        handleGoogleLogin();
                    }}
                    startIcon={<img src={"./Google.svg"} alt="google"/>}
                    sx={{mx: 1, my: 1}}
                >Continue with Google</Button>
                <div>
                    {/* Added Meta OAuth */}
                    <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            handleFacebookLogin();
                        }}
                        startIcon={<img src={"./Meta.svg"} alt="facebook"/>}
                        sx={{mx: 1, my: 1}}
                    >Continue with Facebook</Button>
                </div>
                <div>
                    {/* Added GitHub OAuth */}
                    <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            handleGithubLogin();
                        }}
                        startIcon={<img src={"./Github.svg"} alt="facebook"/>}
                        sx={{mx: 1, my: 1}}
                    >Continue with the GitHub</Button>
                </div>
            </Box>
        </div>
    );
}
