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
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import sjcl from "sjcl";
import React from 'react';

import { accountTypes, colleges, SUCs } from "../../../utils/constants";
import { serverUrl } from "../../../utils/serverUrl";
import { User } from "../../../utils/models";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 50,
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
  avtr: {
    width: 180,
    height: 180,
    marginTop: 50,
  },

}));

function SignUpPage() {
  const history = useHistory();
  const classes = useStyles();

  const [suc, setSuc] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");

  const [sucError, setSucError] = useState(false);
  const [collegeError, setCollegeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setConfirmPasswordError] = useState(false);
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
        <Grid item xs={12} md= {3}> 
          <Avatar 
          classname={classes.avtr}
          src="bsuLogo.png"
          ></Avatar> 
        </Grid>
        <Grid item xs={12} md={6} key="description">
          <Typography variant="h2">Planning and Development Office</Typography>
          <Typography variant="h5">BULACAN STATE UNIVERSITY</Typography>
        </Grid>
        <Grid item xs={12} md= {3}>
        <Avatar 
          classname={classes.avtr}
          src="bsuLogo.png"
          ></Avatar> 
        </Grid>
        <Grid item xs={12} md={8} offset={1} key="form">
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
                  <Grid item xs={12} key="confirm password">
                    <TextField
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={classes.field}
                      label="Confirm Password"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      error={passwordError}
                      helperText = {passwordError ? 'Error Password' : null}
                      value={confirmpassword}
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
        <Grid item xs={12} md={4} key="description">
          <Typography variant="h2">BulSU PIPs</Typography>
          <Divider />
          <typography variant="h3">BulSU-PDO Investment Program System</typography>
        </Grid>  
      </Grid>    
    </Container>
  );
}


export default SignUpPage;
