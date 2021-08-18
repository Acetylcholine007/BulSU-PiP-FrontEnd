import {
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
  import React from "react";
  
  function AccountModal({ open, setOpen, account }) {
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
          color: account.verified ? '#00FF00' : '#FF0000'
      }
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
              hello
                <Grid item xs={12}>
                  <Typography variant="h4">{`${account.suc} - ${account.college}`}</Typography>
                  <Typography variant="body1">{account.email}</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" className = {classes.status}>{`Status: ${account.verified ? 'Verified' : 'Unverified'}`}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button variant = 'contained'>Reject</Button>
                  <Button variant = 'contained'>Delete</Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    );
  }
  
  export default AccountModal;
  