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
import ResponsiveAppBar from "../TopBar/TopBar";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Navigate } from "react-router-dom";
import apis from "../../apis/user";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAuth, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { Avatar } from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [tempname, setTempName] = useState(name);
  const [update, setUpdate] = useState(false);
  const [bio, setBio] = useState("");
  const [tempbio, setTempBio] = useState(bio);
  const [updateBio, setUpdateBio] = useState(false);
  const [alignment, setAlignment] = useState();
  const [open, setOpen] = React.useState(false);
  const [open2, setDelete] = React.useState(false);
  const handleAlignment = async (event, newAlignment) => {
    setAlignment(newAlignment);
    const payload = {
      email: localStorage.getItem("userId"),
      visibility: newAlignment,
    };
    apis.UpdateUserVisibility(payload);
  };
  if (!localStorage.getItem("authenticated")) {
    return <Navigate to="/" replace={true} />;
  } else {
    let email = localStorage.getItem("userId");
    apis.FinduserByEmail({ email }).then((res) => {
      console.log(res[0]);
      setName(res[0].nickname);
      setBio(res[0].bio);
      setAlignment(res[0].visibility);
      setImageURL(res[0].ImageUrl);
    });
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClickDelete = () => {
      setDelete(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleCloseDelete = () => {
      setDelete(false);
    };
    const handlereset = (event) => {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          alert("A reset email have been sent to your email");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    };
    const handledelete = (event) => {
      const auth = getAuth();
      const user = auth.currentUser;
      const payload = {
        email: localStorage.getItem("userId"),
      };
      apis.deleteUserByEmail(payload).then((res) => {
        console.log(res);
      });

      deleteUser(user)
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
      alert("Your account has been deleted");
      setDelete(false);
      localStorage.clear();
      navigate("/");
    };
    const handleChange = () => {
      handlereset();
      setOpen(false);
      localStorage.clear();
      navigate("/");
    };
    const updateUsername = () => {
      if (!update) {
        setUpdate(true);
        setTempName(name);
      } else {
        setUpdate(false);
        setName(tempname);

        const payload = {
          email: localStorage.getItem("userId"),
          nickname: tempname,
        };
        console.log(payload);
        apis.UpdateUserNickname(payload);
      }
    };
    const updateUserbio = () => {
      if (!updateBio) {
        setUpdateBio(true);
        setTempBio(bio);
      } else {
        setUpdateBio(false);
        setBio(tempbio);
        const payload = {
          email: localStorage.getItem("userId"),
          bio: tempbio,
        };
        console.log(payload);
        apis.UpdateUserBio(payload);
      }
    };
    const fileselectedHandler = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const payload = {
          email: localStorage.getItem("userId"),
          ImageUrl: reader.result.toString(),
        };
        apis.UpdateUserImageUrl(payload);
        setImageURL(reader.result.toString());
      };
      reader.readAsDataURL(file);
    };
    return (
      <div>
        <ResponsiveAppBar />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "33%",
              height: "100vh",
            }}
          >
            <Avatar
              sx={{
                mt: 10,
                height: 250,
                width: 250,
              }}
              alt="Profile Photo."
              src={imageURL}
            ></Avatar>
            <Button
              variant="contained"
              component="label"
              sx={{
                mt: 5,
                height: 50,
                width: 350,
              }}
              style={{ background: "#656268" }}
            >
              Update Your Profile Image
              <input type="file" hidden onChange={fileselectedHandler} />
            </Button>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h5" sx={{ mt: 5 }}>
                Email: {email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h5" sx={{ mt: 5 }}>
                Username:
              </Typography>

              {update === false ? (
                <Typography variant="h5" sx={{ mt: 5 }}>
                  {name}
                </Typography>
              ) : (
                <TextField
                  required
                  sx={{ ml: 1, mt: 5, width: 200, height: 5 }}
                  value={tempname}
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                      backgroundColor: "#FFF",
                      paddingLeft: 4,
                      paddingRight: 4,
                      color: "#383838",
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: 14,
                      height: 35,
                      width: 272,
                      padding: "0 14px",
                      fontWeight: "bold",
                    },
                  }}
                  onChange={(e) => {
                    setTempName(e.target.value);
                  }}
                />
              )}

              <Button
                onClick={updateUsername}
                variant="contained"
                sx={{
                  ml: 2,
                  mt: 5,
                  width: 10,
                  height: 30,
                  backgroundColor: "#656268",
                }}
              >
                update
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h5" sx={{ mt: 5 }}>
                Bio:
              </Typography>

              {updateBio === false ? (
                <Typography variant="h5" sx={{ mt: 5 }}>
                  {bio}
                </Typography>
              ) : (
                <TextField
                  required
                  sx={{ ml: 1, mt: 5, width: 200, height: 5 }}
                  value={tempbio}
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                      backgroundColor: "#FFF",
                      paddingLeft: 4,
                      paddingRight: 4,
                      color: "#383838",
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: 14,
                      height: 35,
                      width: 272,
                      padding: "0 14px",
                      fontWeight: "bold",
                    },
                  }}
                  onChange={(e) => {
                    setTempBio(e.target.value);
                  }}
                />
              )}

              <Button
                onClick={updateUserbio}
                variant="contained"
                sx={{
                  ml: 2,
                  mt: 5,
                  width: 10,
                  height: 30,
                  backgroundColor: "#656268",
                }}
              >
                update
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h5" sx={{ mt: 5 }}>
                Profile Visibility:
              </Typography>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton
                  sx={{ mt: 5, ml: 2, height: 30 }}
                  value={true}
                  aria-label="Visible"
                >
                  visible
                </ToggleButton>
                <ToggleButton
                  sx={{ mt: 5, height: 30 }}
                  value={false}
                  aria-label="Not Visible"
                >
                  Not visible
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Button
              variant="contained"
              sx={{ mt: 5, height: 50, width: 350 }}
              style={{ background: "#656268" }}
              onClick={() => {
                handleClickOpen();
              }}
            >
              Change Your Password
            </Button>
            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Change Passwor?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  You sure you want to change your password?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleChange}>Confirm</Button>
                <Button onClick={handleClose}>Back</Button>
              </DialogActions>
            </Dialog>
            <Button
              variant="contained"
              sx={{
                mt: 5,
                height: 50,
                width: 350,
              }}
              style={{ background: "#656268" }}
              onClick={() => {
                handleClickDelete();
              }}
            >
              Delete Your Account
            </Button>
            <Dialog
              open={open2}
              keepMounted
              onClose={handleCloseDelete}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Delete Your Account?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  You sure you want to delete your account from Postman?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handledelete}>Confirm</Button>
                <Button onClick={handleCloseDelete}>Back</Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "33%",
              height: "100vh",
            }}
          >
            <Typography variant="h4" sx={{ mt: 5 }}>
              Your Posted Tasks:
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "34%",
              height: "100vh",
            }}
          >
            <Typography variant="h4" sx={{ mt: 5 }}>
              Your Finished Tasks:
            </Typography>
          </Box>
        </Box>
      </div>
    );
  }
}
