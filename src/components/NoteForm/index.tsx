import { put } from "@/utils/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

/*
 * @Author: SnowWarri0r
 * @LastModifiedBy: SnowWarri0r
 * @GithubUser: SnowWarri0r
 * @Date: 2022-09-09 23:25:23
 * @Company: ncuhome
 * @LastEditTime: 2022-09-09 23:28:42
 * @FilePath: \notelog_fe\src\components\NoteForm\index.tsx
 * @Description:
 */
interface Props {
  open: boolean;
  handleClose: () => void;
  setRefresh: (value: boolean) => void;
}
export default function NoteForm(props: Props) {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const handleSubmit = () => {
    put("/api/note", {
      content: content,
      location: location,
    }).then(() => {
      props.setRefresh(true);
      props.handleClose();
    });
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="Content"
          type="content"
          fullWidth
          variant="standard"
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
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
