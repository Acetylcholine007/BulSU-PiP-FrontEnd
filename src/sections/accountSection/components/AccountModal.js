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
  import { serverUrl } from "../../../utils/serverUrl";
  
  function AccountModal({ open, setOpen, user, setAccounts, accounts }) {
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
          color: user.verified ? '#00FF00' : '#FF0000'
      },
      button: {
        margin: '10px 0px 10px 0px'
      }
    }));
  
    const classes = useStyles();

    const toggleAccountStatus = () => {
      fetch(`${serverUrl}users/${user.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          ...user,
          verified: !user.verified,
        }),
      }).then(() => {
        accounts[accounts.indexOf(user)].verified = !user.verified;
        setAccounts([...accounts])
      });
    };
  
    const deleteAccount = () => {
      fetch(`${serverUrl}users/${user.id}`, {
        method: "DELETE"
      }).then(() => {
        setAccounts(accounts.filter((account) => account.id !== user.id))
      });
    }
    
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
                  <Typography variant="h4">{`${user.suc} - ${user.college}`}</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" className = {classes.status}>{`Status: ${user.verified ? 'Verified' : 'Unverified'}`}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button variant = 'contained' fullWidth className = {classes.button} onClick={toggleAccountStatus}>{user.verified ? "Suspend" : "Verify"}</Button>
                  <Button variant = 'contained' fullWidth className = {classes.button} onClick={deleteAccount}>Delete</Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    );
  }
  
  export default AccountModal;
  