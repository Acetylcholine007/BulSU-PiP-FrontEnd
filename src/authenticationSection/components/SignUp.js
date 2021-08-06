import {
  Backdrop,
  Button,
  Container,
  MenuItem,
  Divider,
  Fade,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Typography
} from "@material-ui/core";
import { useState } from "react";
import { colleges, SUCs } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
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

function SignUp({open, setOpen, handleSignUp, newUser, setNewUser}) {
  const classes = useStyles();

  const [suc, setSuc] = useState(newUser.suc);
  const [college, setCollege] = useState(newUser.college);
  const [email, setEmail] = useState(newUser.email);
  const [password, setPassword] = useState(newUser.password);

  const [sucError, setSucError] = useState(false);
  const [collegeError, setCollegeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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
            <Typography variant="h4">Sign Up</Typography>
            <Divider />
            <form noValidate autoComplete="off" onSubmit={(e) => {
                e.preventDefault();
                handleSignUp(e, {suc, college, email, password});
            }}>
              <Grid container>
              <Grid item xs={12} key="suc">
                  <TextField
                    className={classes.field}
                    id="suc"
                    color="primary"
                    fullWidth
                    select
                    label="SUC"
                    value={suc}
                    onChange={(e) => setSuc(e.target.value)}
                    variant="outlined"
                  >
                    {SUCs.map(
                      (option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      )
                    )}
                    error = {sucError}
                  </TextField>
                </Grid>
                <Grid item xs={12} key="college">
                  <TextField
                    className={classes.field}
                    id="college"
                    color="primary"
                    fullWidth
                    select
                    label="College"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    variant="outlined"
                  >
                    {colleges.map(
                      (option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      )
                    )}
                    error = {collegeError}
                  </TextField>
                </Grid>
                <Grid item xs={12} key="email">
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.field}
                    label="Email Address"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={emailError}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12} key="password">
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.field}
                    label="Password"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={passwordError}
                    value={password}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} key="submit">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    fullWidth
                  >
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </Fade>
    </Modal>
  );
}

export default SignUp;
