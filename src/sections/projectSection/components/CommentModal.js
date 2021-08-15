import {
  Backdrop,
  Container,
  Divider,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import React from "react";

function CommentModal({ open, setOpen, comment }) {
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
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">{comment}</Typography>
                <Typography variant="body1">{comment}</Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{comment}</Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fade>
    </Modal>
  );
}

export default CommentModal;
