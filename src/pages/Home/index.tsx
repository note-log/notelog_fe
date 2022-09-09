/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 22:49:23
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 16:51:39
 * @FilePath: \notelog_fe\src\pages\Home\index.tsx
 * @Description:
 */
import { useStore } from "@/store";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { Box, Container, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { username, auth, fetch } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    if (!ignore && username === "") {
      fetch().catch(() => {
        navigate("/login");
      });
    }
    return () => {
      ignore = true;
    };
  });

  return (
    <>
      <CssBaseline />
      <Header auth={auth} />
      <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(12)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
      {/* sx里面可以写style，mt代表margin-top */}
      <Footer sx={{ mt: 5 }} />
    </>
  );
}
