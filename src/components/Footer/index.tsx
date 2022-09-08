/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 22:50:51
 * @Company: ncuhome
 * @LastEditTime: 2022-09-08 15:39:00
 * @FilePath: \notelog_fe\src\components\Footer\index.tsx
 * @Description:
 */
import { Link, SxProps, Theme, Typography } from "@mui/material";
interface Props {
  sx: SxProps<Theme>
}
export default function Footer(props: Props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Note Log
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
