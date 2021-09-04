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
  Input,
  CardHeader,
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
import {Account} from "../../../utils/bulsupis_mw"

import PDO from "./pdo.png";

const useStyles = makeStyles((theme) => ({
  motherPane: {
    padding: 0,
    margin: 0,
  },
  container: {
    height: "100vh",
    maxWidth: "100vw",
    width: "100vw",
    padding: 0,
    margin: 0,
    //background: "linear-gradient(264deg, rgba(255,115,0,1) 26%, rgba(253,255,0,1) 100%)",
    background:
      "url('https://iadmissions.bulsu.edu.ph/assets/images/parallax-bg2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  background: {},
  formPane: {
    padding: "10%",
    paddingTop: "-3rem",
    background: "rgba(255,255,255,0.95)",
    height: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  field: {
    marginBottom: "0.5rem",
  },
  button: {
    marginTop: "0.5rem",
  },
  button2: {
    marginBottom: "0.7rem",
  },
  avtr: {
    height: 50,
    margin: "0 auto",
  },
  avtr2: {
    height: 50,
    margin: "0 auto",
  },
}));

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();
  const classes = useStyles();
  const { setIsLoggedIn } = useContext(AuthContext);

  const login = (email, password) => {
    // const abortCont = new AbortController();
    // fetch(`${serverUrl}users?password=${password}&&email=${email}`, {
    //   signal: abortCont.signal,
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error("App can't perform verification");
    //     }
    //     return res.json();
    //   })
    //   .then((match) => {
    //     if (match.length === 1) {
    //       if (match[0].verified) {
    //         setUser(match[0]);
    //         fetch(
    //           match[0].type === 0
    //             ? `${serverUrl}institutes?id=${match[0].institute.abbv}`
    //             : `${serverUrl}institutes`,
    //           {
    //             signal: abortCont.signal,
    //           }
    //         )
    //           .then((res) => {
    //             if (!res.ok) {
    //               // error coming back from server
    //               throw Error("could not fetch the data for that resource");
    //             }
    //             return res.json();
    //           })
    //           .then((data) => {
    //             setProjects(data);
    //             history.push("/");
    //           })
    //           .catch((err) => {
    //             if (err.name === "AbortError") {
    //               console.log("fetch aborted");
    //             } else {
    //               console.log(err.message);
    //             }
    //           });
    //       } else {
    //         setMessage(
    //           "Your account is either unverified or has been suspended. Contact system admin to verify your account."
    //         );
    //         setOpen(true);
    //       }
    //     } else {
    //       setEmailError(true);
    //       setPasswordError(true);
    //       console.log("Incorrect Credentials");
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.name === "AbortError") {
    //       console.log("fetch aborted");
    //     } else {
    //       console.log(err.message);
    //     }
    //   });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (!emailError && !passwordError) {
      let result = await Account.login(email, password);
      if (result) {
        console.log("Successful Login");
        setIsLoggedIn(Account.isLoggedIn());
      } else {
        console.log("Invalid Email or Password");
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <Container className={classes.motherPane}>
      <Grid className={classes.container} container>
        <Grid item xs={12} sm={6}>
          <Card className={classes.formPane}>
            <CardContent>
              <div className={`animate__animated animate__fadeInDown`}>
                <p>
                  <img
                    className={classes.avtr}
                    src="favicon.ico"
                    alt="BulSU Icon"
                  ></img>
                  <img className={classes.avtr2} src={PDO} alt="PDO Icon"></img>
                </p>
                <p>BulSU PIPS - ver 0.1</p>
                <Typography variant="h4" component="h1">
                  Sign In
                </Typography>
                <br />
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
                  <br />
                  <Button size="small" className={classes.button2}>
                    forgot password?
                  </Button>
                  <Divider />
                  <Button
                    color="primary"
                    onClick={() => {
                      history.push("/signup");
                    }}
                    size="medium"
                  >
                    Request for an Account Here!
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LogInPage;
