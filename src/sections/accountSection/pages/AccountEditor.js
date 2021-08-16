import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import sjcl from "sjcl";

import { AuthContext } from "../../../contexts/AuthContext";
import { serverUrl } from "../../../utils/serverUrl";

function AccountEditor() {
  const { user, setUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const history = useHistory();

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
    card: {
      padding: 20,
    },
  }));

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
      history.push("/myaccount");
    });
  };

  const classes = useStyles();

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Edit Account</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
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
                    <Button type="submit" color="primary" variant="contained">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AccountEditor;
