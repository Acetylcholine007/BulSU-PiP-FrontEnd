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
import { useState } from "react";
import { useHistory } from "react-router";

import SignUp from "../components/SignUp";
import { serverUrl } from "../../utils/serverUrl";

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

function LogInPage({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    id: "",
    suc: "",
    college: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [newUserError, setNewUserError] = useState({
    id: false,
    suc: false,
    college: false,
    email: false,
    password: false,
  });

  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

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
          setUser(match[0]);
          history.push("/home");
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
      login(email, password);
    }
  };

  const handleSignUp = (e, newUser) => {
    e.preventDefault();
    if (true) {
      fetch(`${serverUrl}users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      }).then(() => {
        setOpen(false);
        login(newUser.email, newUser.password);
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
                    setOpen(true);
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
      <SignUp open={open} setOpen={setOpen} handleSignUp={handleSignUp} newUser = {newUser} setNewUser = {setNewUser}/>
    </Container>
  );
}

export default LogInPage;
