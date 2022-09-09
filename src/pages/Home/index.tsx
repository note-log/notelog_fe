/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 22:49:23
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 20:10:27
 * @FilePath: \notelog_fe\src\pages\Home\index.tsx
 * @Description:
 */
import { useStore } from "@/store";
import { get } from "@/utils/api";
import { Response } from "@/store";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { Box, Container, CssBaseline, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "@/components/NoteCard";
interface Note {
  id: number;
  content: string;
}
export default function Home() {
  const { username, auth, fetch } = useStore();
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await get("/api/note");
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
    };
    if (refresh) {
      setRefresh(false);
      fetchNote().then((res) => {
        setNotes((res as Response<Array<Note>>).data.notes);
      });
    }
  }, [refresh]);
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
  }, []);

  return (
    <>
      <CssBaseline />
      <Header auth={auth} />

      <Grid container spacing={4} style={{ padding: 16 }}>
        {notes.map((note, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <NoteCard content={note.content} />
            </Grid>
          );
        })}
        {[...new Array(12)].map((_, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <NoteCard content={"hello world"} />
            </Grid>
          );
        })}
      </Grid>
      {/* sx里面可以写style，mt代表margin-top */}
      <Footer sx={{ mt: 5 }} />
    </>
  );
}
