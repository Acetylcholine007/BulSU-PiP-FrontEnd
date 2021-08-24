import {
  Backdrop,
  Container,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import { useContext, useState } from "react";
import sjcl from "sjcl";

import { AuthContext } from "../../contexts/AuthContext";
import { serverUrl } from "../../utils/serverUrl";

function AccountEditorModal({ open, setOpen }) {
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
    }
  }));

  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);

  const handleSubmit = () => {
    const myBitArray = sjcl.hash.sha256.hash(password);
    const myHash = sjcl.codec.hex.fromBits(myBitArray);
    fetch(`${serverUrl}users/${user.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ...user,
        email,
        password: myHash,
      }),
    }).then(() => {
      console.log('Successfully edited');
    });
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
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">Edit Account</Typography>
              </Grid>
              <Grid item xs={12}>
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TextField
                          onChange={(e) => setEmail(e.target.value)}
                          className={classes.field}
                          label="Email"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          error={false}
                          value={email}
                          helperText={false ? "Error Email" : null}
                        />
                        <Grid item xs={12}>
                          <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.field}
                            label="New Password"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            error={false}
                            value={password}
                            helperText={false ? "Error Email" : null}
                            type="password"
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                          >
                            Save Changes
                          </Button>
                        </Grid>
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
