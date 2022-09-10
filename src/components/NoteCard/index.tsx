import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import NoteDetail from "@components/NoteDetail";

/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-09 18:06:35
 * @Company: ncuhome
 * @LastEditTime: 2022-09-10 20:10:37
 * @FilePath: /note-log/src/components/NoteCard/index.tsx
 * @Description:
 */
interface Props {
  noteId: number;
  content: string;
}
export default function NoteCard(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card style={{ minHeight: 300 }} onClick={handleClick}>
        <CardContent>
          <Typography variant="body2">
            {props.content.split("\n").map((i, key) => {
              if (i === "") return <br />;
              else return <div key={key}>{i}</div>;
            })}
          </Typography>
        </CardContent>
      </Card>
      <NoteDetail noteId={props.noteId} open={open} handleClose={handleClose} />
    </>
  );
}
