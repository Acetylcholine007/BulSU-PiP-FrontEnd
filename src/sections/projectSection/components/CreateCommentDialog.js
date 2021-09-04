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
import commentValidator from "../../../utils/commentValidator";

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

  const [checkercomment, setcheckercomment] = useState({
        message: {
        error: false,
        messages: [],
    }
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
          error={checkercomment.message.error}
          helperText={checkercomment.message.error ? checkercomment.message.messages[0] : null}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddCommentOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            var checkercomment = commentValidator(comment.message);
            if(!checkercomment.message.error){
            setComments([...comments, {...comment, datetime: (new Date()).toISOString()}]);
            setLocalComment({
              id: count + 1,
              author: "PDO Officer",
              header: "",
              message: ""
            });
            setAddCommentOpen(false);
          }
          setcheckercomment(checkercomment);
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
