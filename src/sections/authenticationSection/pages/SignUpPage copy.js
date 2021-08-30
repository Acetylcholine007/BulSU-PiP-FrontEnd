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
import React from "react";

import { institutes } from "../../../utils/constants";
import { serverUrl } from "../../../utils/serverUrl";
import Avatar from "@material-ui/core/Avatar";

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

  const [institute, setInstitute] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSignUp = (e, newUser) => {
    e.preventDefault();
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
        <Grid item xs={12} md={3}>
          <Avatar className={classes.avtr} src="bsuLogo.png"></Avatar>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h2">Planning and Development Office</Typography>
          <Typography variant="h5">BULACAN STATE UNIVERSITY</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Avatar className={classes.avtr} src="bsuLogo.png"></Avatar>
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
                  handleSignUp(e, {
                    institute: {institute: institute.institute, abbv: institute.abbv},
                    email,
                    password: myHash,
                    uri: `${institute.abbv}.png`,
                    verified: true,
                    type: institute.type,
                    notificationList: [],
                    projectList: [],
                  });
                }}
              >
                <Grid container>
                  <Grid item xs={12} key="institute">
                    <TextField
                      className={classes.field}
                      id="institute"
                      color="primary"
                      fullWidth
                      select
                      label="Institute"
                      value={institute}
                      onChange={(e) => setInstitute(e.target.value)}
                      variant="outlined"
                    >
                      {institutes.map((institute) => (
                        <MenuItem key={institute.abbv} value={institute}>
                          {institute.institute}
                        </MenuItem>
                      ))}
                      error = {false}
                      helperText = {false ? "Error Email" : null}
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
                      error={false}
                      helperText={false ? "Error Email" : null}
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
                      error={false}
                      helperText={false ? "Error Email" : null}
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
                      error={false}
                      helperText={false ? "Error Password" : null}
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
        <Grid item xs={12} md={4}>
          <Typography variant="h2">BulSU PIPs</Typography>
          <Divider />
          <Typography variant="h3">
            BulSU-PDO Investment Program System
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpPage;
