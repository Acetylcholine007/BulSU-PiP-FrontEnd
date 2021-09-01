import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";

function CreateCommentDialog({
  open,
  setAddCommentOpen,
  comments,
  setComments,
  count,
}) {
  const [comment, setLocalComment] = useState({
    id: count + 1,
    author: "PDO Officer",
    header: "",
    message: ""
  });
  return (
    <Dialog
      open={open}
      onClose={() => setAddCommentOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="message"
          label="Message"
          fullWidth
          value={comment.message}
          onChange={(e) => {
            setLocalComment({ ...comment, message: e.target.value });
          }}
          multiline
          minRows={5}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddCommentOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setComments([...comments, {...comment, datetime: (new Date()).toISOString()}]);
            setLocalComment({
              id: count + 1,
              author: "PDO Officer",
              header: "",
              message: ""
            });
            setAddCommentOpen(false);
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCommentDialog;
