import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@material-ui/core";
  import React from "react";
import { DialogContext } from "../../contexts/DialogContext";
  
  function AppDialog() {
    const { showDialog, setShowDialog, dialogData } = useContext(DialogContext);

    return (
    <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogData.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {dialogData.actions}
        </DialogActions>
      </Dialog>
    );
  }
  
  export default AppDialog;
  