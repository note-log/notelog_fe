import { useRefresh } from "@/store";
import { put } from "@/utils/api";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
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
}
export default function NoteForm(props: Props) {
  const { setRefresh } = useRefresh();
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const handleClose = () => {
    props.handleClose();
    setContent("");
    setLocation("");
  };
  const handleSubmit = () => {
    put("/api/note", {
      content: content,
      location: location,
    }).then(() => {
      setRefresh(true);
      setContent("");
      setLocation("");
      props.handleClose();
    });
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Note</DialogTitle>
      <DialogContent>
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddLocationAltIcon />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
