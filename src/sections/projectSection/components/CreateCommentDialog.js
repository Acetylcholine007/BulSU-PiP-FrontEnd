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
import { Projects } from "../../../utils/bulsupis_mw";
import commentValidator from "../../../utils/commentValidator";

function CreateCommentDialog({
  open,
  setAddCommentOpen,
  comments,
  setComments,
  projectId,
}) {
  const [comment, setLocalComment] = useState({
    author: { institute: "Editor" },
    message: "",
  });

  const [checkercomment, setcheckercomment] = useState({
    message: {
      error: false,
      messages: [],
    },
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
          helperText={
            checkercomment.message.error
              ? checkercomment.message.messages[0]
              : null
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddCommentOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            var checkercomment = commentValidator(comment.message);
            if (!checkercomment.message.error) {
              Projects.comment(projectId, comment.message).then((res) => {
                console.log(res);
                if (res) {
                  setComments([...comments, {...res.data, author: 'Editor'}]);
                  setLocalComment({
                    message: "",
                  });
                  setAddCommentOpen(false);
                } else {
                  checkercomment.message.error = true;
                  checkercomment.message.messages.push("Failed to add comment");
                }
              });
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
