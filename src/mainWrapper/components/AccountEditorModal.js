import {
  Backdrop,
  Container,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { SnackbarContext } from "../../contexts/SnackbarContext";

import accountEditorValidator from "../../utils/accountEditorValidator";
import { Account } from "../../utils/bulsupis_mw";

function AccountEditorModal({ open, setOpen }) {
  const { setShowSnackbar, setSnackbarData } = useContext(SnackbarContext);

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
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
  }));

  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [accountEditorChecker, setaccountEditorChecker] = useState({
    password: {
      error: false,
      messages: [],
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    var checker = accountEditorValidator(password);
    if (!checker.password.error) {
      Account.changePassword(password)
        .then(({ simple, full }) => {
          if (simple) {
            setSnackbarData({
              type: 0,
              message: "Password changed",
            });
            setOpen(false);
          } else {
            setSnackbarData({
              type: 3,
              message: full,
            });
            setOpen(false);
          }
        })
        .catch((err) => {
          setSnackbarData({
            type: 3,
            message: err.message,
          });
          setOpen(false);
        })
        .finally(() => setShowSnackbar(true));
    }
    setaccountEditorChecker(checker);
  };

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
          <Container maxWidth="xs">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">Edit Account</Typography>
              </Grid>
              <Grid item xs={12}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.field}
                        label="New Password"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        error={accountEditorChecker.password.error}
                        value={password}
                        helperText={
                          accountEditorChecker.password.error
                            ? accountEditorChecker.password.messages
                            : null
                        }
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12} align="center">
                      <Button type="submit" color="primary" variant="contained">
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fade>
    </Modal>
  );
}

export default AccountEditorModal;
