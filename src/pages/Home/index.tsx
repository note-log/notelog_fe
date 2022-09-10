/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-07 22:49:23
 * @Company: ncuhome
 * @LastEditTime: 2022-09-10 20:10:47
 * @FilePath: /note-log/src/pages/Home/index.tsx
 * @Description:
 */
import { Note, useRefresh, useStore } from "@/store";
import { get } from "@/utils/api";
import { Response } from "@/store";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { CssBaseline, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "@/components/NoteCard";
import NoteForm from "@/components/NoteForm";
import style from "./index.module.css";

export default function Home() {
  const { username, auth, fetch } = useStore();
  const [notes, setNotes] = useState<Array<Note>>([]);
  const { refresh, setRefresh } = useRefresh();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <Header auth={auth} handleClick={handleClick} />
      <Grid
        container
        spacing={4}
        className={style.background}
        style={{ padding: 16 }}
      >
        <NoteForm open={open} handleClose={handleClose} />
        {notes.map((note, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <NoteCard content={note.content} noteId={note.id} />
            </Grid>
          );
        })}
      </Grid>
      {/* sx里面可以写style，mt代表margin-top */}
      <Footer sx={{ pt: 4 }} className={style.background} />
    </>
  );
}
