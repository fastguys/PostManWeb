import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SegmentedControl from "mui-segmented-control";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/user";
const pages = [];
const settings = ["Profile", "Logout", "myChat"];

export default function ResponsiveAppBar(props) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const setIsTaskTakerMode = props.setIsTaskTakerMode;

  const [value, setValue] = React.useState(1);
  const [image, setImage] = React.useState(null);
  let email = localStorage.getItem("userId");
  apis.FinduserByEmail({ email }).then((res) => {
    if (res[0] && res[0].ImageUrl) {
      setImage(res[0].ImageUrl);
    }
  });
  React.useEffect(() => {
    if (value === 1) {
      setIsTaskTakerMode(true);
    } else {
      setIsTaskTakerMode(false);
    }
  }, [value]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const OpenProfile = (e) => {
    console.log(e);
    navigate("/profilepage");
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const gotoChat = () => {
    navigate("/chatpage");
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: "#656268" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*<img*/}
          {/*    src={"/logo.svg"}*/}
          {/*    alt="logo"*/}
          {/*    style={{ width: 40, height: 37 }}*/}
          {/*    sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}*/}
          {/*/>*/}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/homepage"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PostMan
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PostMan
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* mode segmented control */}
          <SegmentedControl
            color="primary"
            options={[
              {
                label: "TaskTaker",
                value: 1,
              },
              {
                label: "TaskPoster",
                value: 2,
              },
            ]}
            value={value}
            onChange={setValue}
          />
          {/* till here */}

          <Box sx={{ flexGrow: 0, ml: 4 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={image ? image : "/static/images/avatar/2.jpg"}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Profile"
                      ? OpenProfile
                      : setting == "Logout"
                      ? logout
                      : gotoChat
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
