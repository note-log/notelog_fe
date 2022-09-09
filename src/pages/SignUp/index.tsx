import Footer from "@/components/Footer";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Header from "@components/Header";
import { SubmitHandler, useForm } from "react-hook-form";
import { post } from "@utils/api";
import { Response } from "@/store";
import Toast from "@components/Toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
type Inputs = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  phone: string;
};
export default function SignUp() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => navigate("/login"), 1000);
    }
  }, [isSuccess]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    post("/api/user/register", {
      username: data.username,
      password: data.password,
      email: data.email,
      phone: data.phone,
    })
      .then((res) => {
        Toast.success((res as Response<string>).message);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("username", {
                    required: "no username is dame",
                    minLength: { value: 6, message: "too short" },
                    maxLength: { value: 20, message: "too long" },
                  })}
                  helperText={errors.username ? errors.username.message : ""}
                  error={Boolean(errors.username)}
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: "no email is dame",
                    maxLength: { value: 30, message: "too long" },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                      message: "wrong email format",
                    },
                  })}
                  helperText={errors.email ? errors.email.message : ""}
                  error={Boolean(errors.email)}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("phone", {
                    required: "no phone number is dame",
                    pattern: {
                      value:
                        /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[235-8]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|66\d{2})\d{6}$/,
                      message: "wrong phone number format",
                    },
                  })}
                  helperText={errors.phone ? errors.phone.message : ""}
                  error={Boolean(errors.phone)}
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
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
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("repeatPassword", {
                    required: "no repeat password is dame",
                    validate: (value) =>
                      value === watch("password") ||
                      "repeat password is inconsistent with the current password",
                  })}
                  helperText={
                    errors.repeatPassword ? errors.repeatPassword.message : ""
                  }
                  error={Boolean(errors.repeatPassword)}
                  fullWidth
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  id="repeatPassword"
                  autoComplete="repeatPassword"
                  variant="standard"
                />
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
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer sx={{ mt: 5 }} />
    </>
  );
}
