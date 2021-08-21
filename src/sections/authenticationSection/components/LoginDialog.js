import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@material-ui/core";
  import React from "react";
  
  function LoginDialog({ open, setOpen, message }) {
    return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Account Status</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default LoginDialog;
  