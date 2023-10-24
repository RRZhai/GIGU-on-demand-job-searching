import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppBar, Box } from "@mui/material";
import { Toolbar, Switch } from "@mui/material";
import { Typography, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
function HeaderBar({
  currentUser,
  handleCurrentUser,
  hangleAllJobs,
  userRole,
  handleActiveJob,
  handleSetRole,
  handleJobsByLocation,
  handleProfileUser,
  theme,
}) {
  const { dispatch: userDispatch } = useContext(UserContext);

  const isActive = true;
  const notActive = false;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const logout = () => {
    fetch("http://localhost:5555/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        if (resp.ok) {
          userDispatch({ type: "remove" });
          handleCurrentUser(null);
          navigate("/");
        } else {
          resp.json().then((err) => setErrors(err));
        }
      })
      .catch((err) => setErrors(err));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar disableGutters>
          <Link
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flexGrow: 2 }}
            to="/"
            onClick={hangleAllJobs}
            name="employer"
          >
            <img
              src="GIGULogo.png"
              height={"50px"}
              style={{ padding: "10px" }}
            />
          </Link>
          <TextField
            id="search-bar"
            label="Enter a city name"
            placeholder="Search..."
            onChange={(e) => {
              handleJobsByLocation(e.target.value);
            }}
            variant="outlined"
            size="small"
            sx={{ border: "10px" }}
          />
          <Box sx={{ p: 2, border: "1px" }}>
            {userRole === "employer" && currentUser ? (
              <Button
                noWrap
                sx={{ flexGrow: 1 }}
                variant="button"
                color="text.primary"
                component={Link}
                to="/newjob"
              >
                Add New Job
              </Button>
            ) : null}
              <Button
                noWrap
                sx={{ flexGrow: 1 }}
                variant="button"
                color="text.primary"
                component={Link}
                to="/jobs"
              >
                All Active Jobs
              </Button>
          </Box>
          <Box
            style={{ padding: "10px" }}
            ml="auto"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {currentUser ? (
              <Box style={{ padding: "10px" }}>
                {userRole === "jobseeker" ? (
                  <Tooltip title={userRole}>
                    <Switch
                      {...label}
                      defaultChecked
                      color="primary"
                      to={"/jobs"}
                      onClick={(e) => handleSetRole(e.target.name)}
                      name="employer"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={userRole}>
                    <Switch
                      {...label}
                      color="primary"
                      to={"/jobs"}
                      onClick={(e) => handleSetRole(e.target.name)}
                      name="jobseeker"
                    />
                  </Tooltip>
                )}
                <Link>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={currentUser?.username}
                        src={`../${currentUser.profile_pic_num}.png`}
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
                    <MenuItem
                      key="profile"
                      onClick={() => {
                        handleCloseUserMenu();
                        handleProfileUser(currentUser);
                      }}
                      component={Link}
                      to="/profile/:name"
                    >
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      key="My Active Job"
                      onClick={(e) => handleActiveJob(isActive)}
                      component={Link}
                      to="/myjobs"
                    >
                      <Typography textAlign="right">My Active Job</Typography>
                    </MenuItem>
                    <MenuItem
                      key="My Past Job"
                      onClick={(e) => handleActiveJob(notActive)}
                      component={Link}
                      to="/myjobs"
                      theme={theme}
                    >
                      <Typography textAlign="right">My Past Job</Typography>
                    </MenuItem>
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        handleCloseUserMenu();
                        logout();
                      }}
                      component={Link}
                      to="/"
                    >
                      <Typography textAlign="right">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Link>
              </Box>
            ) : (
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ my: 1, mx: 1.5 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default HeaderBar;
