/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 22:50:40
 * @Company: ncuhome
 * @LastEditTime: 2022-09-08 13:53:08
 * @FilePath: \notelog_fe\src\components\Header\index.tsx
 * @Description:
 */
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Typography,
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
export default function Header() {
  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              Note Log
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
