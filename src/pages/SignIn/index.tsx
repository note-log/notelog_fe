/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 11:10:04
 * @Company: ncuhome
 * @LastEditTime: 2022-09-08 18:35:10
 * @FilePath: \notelog_fe\src\pages\SignIn\index.tsx
 * @Description:
 */
import Header from "@components/Header";
import Footer from "@components/Footer";
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
import { SubmitHandler, useForm } from "react-hook-form";
type Inputs = {
  username: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
            Sign in
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
                    maxLength: { value: 10, message: "too long" },
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
                  {...register("password", {
                    required: "no password is dame",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*]{8,16}$/,
                      message:
                        "必须包含大小写字母和数字的组合，可以使用特殊字符(~!@#$%^&*)，长度在8-16之间",
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  New User? Sign Up
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
