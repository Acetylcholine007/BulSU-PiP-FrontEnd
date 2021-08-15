import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import sjcl from "sjcl";

import { serverUrl } from "../../../utils/serverUrl";
import { User } from "../../../utils/models";
import { AuthContext } from "../../../contexts/AuthContext";

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

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();
  const classes = useStyles();
  const {setUser} = useContext(AuthContext);

  const login = (email, password) => {
    const abortCont = new AbortController();
    fetch(`${serverUrl}users?password=${password}&&email=${email}`, {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("App can't perform verification");
        }
        return res.json();
      })
      .then((match) => {
        if (match.length === 1) {
          setUser(new User(match[0]));
          history.push("/");
        } else {
          setEmailError(true);
          setPasswordError(true);
          console.log("Incorrect Credentials");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          console.log(err.message);
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (!emailError && !passwordError) {
      const myBitArray = sjcl.hash.sha256.hash(password);
      const myHash = sjcl.codec.hex.fromBits(myBitArray);
      login(email, myHash);
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
              <form noValidate autoComplete="off" onSubmit={handleLogin}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.field}
                  label="Email"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  error={emailError}
                  value={email}
                  helperText={passwordError ? "Error Email" : null}
                />
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
                  helperText={passwordError ? "Error Password" : null}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  fullWidth
                >
                  LOG IN
                </Button>
                <Divider />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    history.push("/signup");
                  }}
                  className={classes.button}
                  fullWidth
                >
                  CREATE ACCOUNT
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LogInPage;
