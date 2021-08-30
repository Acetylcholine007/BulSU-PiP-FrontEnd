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
import { AuthContext } from "../../../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { ProjectContext } from "../../../contexts/ProjectContext";
import LoginDialog from "../components/LoginDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 250,
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
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(10),
  },

  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1,
  },
  title: {
    marginTop: 40,
  },
}));

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();
  const classes = useStyles();
  const { setUser } = useContext(AuthContext);
  const { setProjects } = useContext(ProjectContext);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
          if (match[0].verified) {
            setUser(match[0]);
            fetch(
              match[0].type === 0
                ? `${serverUrl}institutes?id=${match[0].institute.abbv}`
                : `${serverUrl}institutes`,
              {
                signal: abortCont.signal,
              }
            )
              .then((res) => {
                if (!res.ok) {
                  // error coming back from server
                  throw Error("could not fetch the data for that resource");
                }
                return res.json();
              })
              .then((data) => {
                setProjects(data);
                history.push("/");
              })
              .catch((err) => {
                if (err.name === "AbortError") {
                  console.log("fetch aborted");
                } else {
                  console.log(err.message);
                }
              });
          } else {
            setMessage(
              "Your account is either unverified or has been suspended. Contact system admin to verify your account."
            );
            setOpen(true);
          }
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
      <AppBar className={classes.appbar} elevation={0} color="transparent">
        <Toolbar>
          <Avatar className={classes.avtr} src="favicon.ico"></Avatar>
          <Typography className={classes.date} variant="h2" align="left">
            Planning and Development Office
          </Typography>
          <Typography></Typography>
          <Avatar className={classes.avtr} src="favicon.ico"></Avatar>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} md={5}>
          <Typography variant="h2" align="left"></Typography>
          <Typography variant="h5" align="left"></Typography>
        </Grid>
        <Grid item xs={12} md={5}></Grid>
        <Grid item xs={12} md={5} offset={1} key="form">
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
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                  size="medium"
                >
                  LOGIN
                </Button>
                <Divider />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    history.push("/signup");
                  }}
                  className={classes.button}
                  size="medium"
                >
                  Sign-Up
                </Button>
                <Button size="small">forgot password?</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5} key="description">
          <Typography className={classes.title} variant="h2" align="right">
            BulSU PiPs
          </Typography>
          <Typography variant="h4" align="right">
            BulSU-PDO
          </Typography>
          <Typography variant="h4" align="right">
            Investment
          </Typography>
          <Typography variant="h4" align="right">
            Program
          </Typography>
          <Typography variant="h4" align="right">
            System
          </Typography>
        </Grid>
      </Grid>
      <LoginDialog open={open} setOpen={setOpen} message={message} />
    </Container>
  );
}

export default LogInPage;
