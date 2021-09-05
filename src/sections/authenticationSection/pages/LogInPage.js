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

import { AuthContext } from "../../../contexts/AuthContext";
import loginValidator from "../../../utils/loginValidator";
import { Account } from "../../../utils/bulsupis_mw";

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

  const history = useHistory();
  const classes = useStyles();
  const [loginChecker, setLoginChecker] = useState({
    email: {
      error: false,
      messages: [],
    },
    password: {
      error: false,
      messages: [],
    },
  });
  console.log(PDO);
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    var checker = loginValidator(email, password);
    if (!checker.email.error && !checker.password.error) {
      let result = await Account.login(email, password);
      if (result) {
        console.log("Successful Login");
        setIsLoggedIn(Account.isLoggedIn());
      } else {
        console.log("Invalid Email or Password");
        checker.email.error = true;
        checker.password.error = true;
        checker.email.messages.push("Probably incorrect Email");
        checker.password.messages.push("Probably incorrect Password");
      }
    }
    setLoginChecker(checker);
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
                    error={loginChecker.email.error}
                    helperText={
                      loginChecker.email.error
                        ? loginChecker.email.messages
                        : null
                    }
                    value={email}
                  />
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.field}
                    label="Password"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={loginChecker.password.error}
                    value={password}
                    type="password"
                    helperText={
                      loginChecker.password.error
                        ? loginChecker.password.messages
                        : null
                    }
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
                  <Button
                    size="small"
                    className={classes.button2}
                    onClick={() =>
                      window.open(
                        "https://haiku-test-leo.herokuapp.com/test/reset?fbclid=IwAR12a723__oaymbbfXtf1bR8-HDDVSkMWcQERTPiLuPTm8QeUic7hqydPoo",
                        "_blank"
                      )
                    }
                  >
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
