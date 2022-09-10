import { Response, Note, useRefresh } from "@/store";
import { get, post } from "@/utils/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-10 17:16:13
 * @Company: ncuhome
 * @LastEditTime: 2022-09-10 17:16:14
 * @FilePath: /note-log/src/components/NoteDetail/index.tsx
 * @Description:
 */
interface Props {
  noteId: number;
  open: boolean;
  handleClose: () => void;
}
export default function NoteDetail(props: Props) {
  const [content, setContent] = useState("");
  const { setRefresh } = useRefresh();
  const [location, setLocation] = useState("");
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const handleSubmit = () => {
    post("/api/note", {
      id: props.noteId,
      content: content,
      location: location,
    }).then(() => {
      setLocation("");
      setRefresh(true);
      props.handleClose();
    });
  };
  const handleClose = () => {
    setLocation("");
    props.handleClose();
  };
  useEffect(() => {
    if (props.open) {
      get("/api/note/detail?noteId=" + props.noteId).then((res) => {
        setContent((res as Response<Note>).data.note.content);
      });
    }
  }, [props.open]);
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle id="scroll-dialog-title">Note</DialogTitle>
      <DialogContent dividers={true}>
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="Content"
          type="content"
          multiline
          fullWidth
          variant="outlined"
          value={content}
          onChange={handleContentChange}
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          type="location"
          fullWidth
          variant="standard"
          value={location}
          onChange={handleLocationChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
