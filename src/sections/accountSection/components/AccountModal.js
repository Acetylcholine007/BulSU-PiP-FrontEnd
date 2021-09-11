import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";

function AccountModal({ open, setOpen, user, handleToggle, handleDelete }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle id="form-dialog-title">Account Information</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={2}>
            <Avatar src={user.institute.profile_img.src} />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6">
              {`${user.institute.institute}`}
            </Typography>
            <Typography variant="body1">{`${user.email}`}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleToggle(user);
            setOpen(false);
          }}
        >
          {user.verified ? "Suspend" : "Verify"}
        </Button>
        <Button
          onClick={() => {
            handleDelete(user);
            setOpen(false);
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountModal;
