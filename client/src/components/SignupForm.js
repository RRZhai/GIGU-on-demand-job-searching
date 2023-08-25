import * as React from "react";
import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useFormik } from "formik";
import * as yup from "yup";
import Error from "./Error";

const SignUpForm = ({ currentUser, updateCurrentUser }) => {
  const { dispatch : userDispatch } = useContext(UserContext)

  const navigate = useNavigate();
  const defaultTheme = createTheme();
  if (currentUser) {
    navigate("/");
  }
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    name: yup.string().required("Name is required"),
    password: yup
      .string()
      .min(10, "Password must be at least 10 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      profile_pic_url:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
        fetch('/signup',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((data) => {
              userDispatch({type: "fetch", payload: data})
              updateCurrentUser(data.user);
              navigate("/");
            });
          } else {
            resp.json().then((err) => setErrors(err));
          }
        })
        .catch((err) => setErrors(err));
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? <Alert severity="error">{formik.errors.email}</ Alert> : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name ? <Alert severity="error">{formik.errors.name}</ Alert> : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    onChange={formik.handleChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.errors.password ? <Alert severity="error">{formik.errors.password}</ Alert> : null}
                </Grid>
              {errors ? <Error msg={errors} /> : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUpForm;
