import {
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import sjcl from "sjcl";

import { accountTypes, colleges, SUCs } from "../../../utils/constants";
import { serverUrl } from "../../../utils/serverUrl";
import { User } from "../../../utils/models";

const useStyles = makeStyles(() => ({
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
}));

function SignUpPage() {
  const history = useHistory();
  const classes = useStyles();

  const [suc, setSuc] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const [sucError, setSucError] = useState(false);
  const [collegeError, setCollegeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  const handleSignUp = (e, newUser) => {
    e.preventDefault();
    console.log(newUser.toObject());
    if (true) {
      fetch(`${serverUrl}users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      }).then(() => {
        history.push("/");
      });
    }
  };

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={5} key="description">
          <Typography variant="h1">BulSU PiP</Typography>
        </Grid>
        <Grid item xs={12} md={6} offset={1} key="form">
          <Card>
            <CardContent>
              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  const myBitArray = sjcl.hash.sha256.hash(password);
                  const myHash = sjcl.codec.hex.fromBits(myBitArray);
                  handleSignUp(e, new User({id: "", suc, college, email, password: myHash, uri: "", type, verified: true, notificationList: [], projectList: []}));
                }}
              >
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
                      {SUCs.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      error = {sucError}
                      helperText = {sucError ? 'Error Email' : null}
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
                      {colleges.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      error = {collegeError}
                      helperText = {collegeError ? 'Error Email' : null}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} key="type">
                    <TextField
                      className={classes.field}
                      id="type"
                      color="primary"
                      fullWidth
                      select
                      label="Account Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      variant="outlined"
                    >
                      {accountTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      error = {typeError}
                      helperText = {typeError ? 'Error Email' : null}
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
                      helperText = {emailError ? 'Error Email' : null}
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
                      helperText = {passwordError ? 'Error Email' : null}
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpPage;
