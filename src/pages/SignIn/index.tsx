/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 11:10:04
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 20:13:22
 * @FilePath: \notelog_fe\src\pages\SignIn\index.tsx
 * @Description:
 */
import Header from "@components/Header";
import Footer from "@components/Footer";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@components/Toast";
import { post } from "@/utils/api";
import { Response } from "@/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
type Inputs = {
  username: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    post("/api/auth/login", {
      username: data.username,
      password: data.password,
    })
      .then((res) => {
        Toast.success((res as Response<string>).message);
        localStorage.setItem("token", (res as Response<string>).data.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [isLoggedIn]);
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
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
          <Header style={{ position: "relative" }} />
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("username", {
                  required: "no username is dame",
                  minLength: { value: 6, message: "too short" },
                  maxLength: { value: 20, message: "too long" },
                })}
                helperText={errors.username ? errors.username.message : ""}
                error={Boolean(errors.username)}
                margin="normal"
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                variant="standard"
              />
              <TextField
                {...register("password", {
                  required: "no password is dame",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*]{8,32}$/,
                    message:
                      "必须包含大小写字母和数字的组合，可以使用特殊字符(~!@#$%^&*)，长度在8-32之间",
                  },
                })}
                helperText={errors.password ? errors.password.message : ""}
                error={Boolean(errors.password)}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="standard"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    New User? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Footer sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
