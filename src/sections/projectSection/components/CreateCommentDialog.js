import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useState } from "react";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { Projects } from "../../../utils/bulsupis_mw";
import commentValidator from "../../../utils/commentValidator";

function CreateCommentDialog({
  open,
  setAddCommentOpen,
  comments,
  setComments,
  projectId,
}) {
  const { setShowSnackbar, setSnackbarData } = useContext(SnackbarContext);
  const { setIsLoading } = useContext(LoadingContext);
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
      fullWidth={true}
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
              setIsLoading(true);
              Projects.comment(projectId, comment.message)
                .then(({ simple, full }) => {
                  if (simple) {
                    setComments([
                      ...comments,
                      { ...simple.data, author: { institute: "Editor" } },
                    ]);
                    setLocalComment({
                      message: "",
                    });
                    setSnackbarData({
                      type: 0,
                      message: "Comment added",
                    });
                    setAddCommentOpen(false);
                  } else {
                    setSnackbarData({
                      type: 3,
                      message: full,
                    });
                    setAddCommentOpen(false);
                  }
                })
                .catch((err) => {
                  setSnackbarData({
                    type: 3,
                    message: err.message,
                  });
                  setAddCommentOpen(false);
                })
                .finally(() => {
                  setIsLoading(false);
                  setShowSnackbar(true);
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
