/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 22:50:40
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 20:12:55
 * @FilePath: \notelog_fe\src\components\Header\index.tsx
 * @Description:
 */
import { useStore } from "@/store";
import { AccountCircle } from "@mui/icons-material";
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
interface Props {
  children: React.ReactElement;
}
function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
export default function Header({ auth = false, style = {} }) {
  const { username } = useStore();
  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar style={style}>
          <Toolbar>
            <Typography variant="h6" component="div">
              Note Log
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {auth && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex", alignItems: "center" },
                }}
              >
                <AccountCircle sx={{ marginRight: 1 }} />
                <Typography variant="h6">{username}</Typography>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
