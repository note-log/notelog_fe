/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 22:50:40
 * @Company: ncuhome
 * @LastEditTime: 2022-09-10 10:05:37
 * @FilePath: \notelog_fe\src\components\Header\index.tsx
 * @Description:
 */
import { useStore } from "@/store";
import { AccountCircle } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
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
export default function Header({
  auth = false,
  style = {},
  handleClick = () => {},
}) {
  const { username } = useStore();
  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar style={style}>
          <Toolbar>
            <Grid container justifyContent="center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
              >
                <Typography variant="h6">Note Log</Typography>
              </div>
              <div style={{ flex: 1 }} />
              {auth && (
                <>
                  <IconButton onClick={handleClick}>
                    <AddIcon htmlColor="#ffff" />
                  </IconButton>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <AccountCircle style={{ margin: 3 }} />
                    <Typography variant="h6">{username}</Typography>
                  </div>
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
