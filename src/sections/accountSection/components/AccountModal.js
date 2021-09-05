import {
  Avatar,
  Backdrop,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";

function AccountModal({ open, setOpen, user, handleToggle, handleDelete }) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 10,
    },
    status: {
      color: user.verified ? "#00FF00" : "#FF0000",
    },
  }));

  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth={"sm"}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Container maxWidth="xs">
            <Grid container>
              <Grid item xs>
                {console.log(user)}
                <Avatar src={user.institute.profile_img.src} />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5">{`${user.institute.institute}`}</Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Statistics</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs align="center">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleToggle(user);
                    setOpen(false);
                  }}
                >
                  {user.verified ? "Suspend" : "Verify"}
                </Button>
              </Grid>
              <Grid item xs align="center">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDelete(user);
                    setOpen(false);
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fade>
    </Modal>
  );
}

export default AccountModal;
