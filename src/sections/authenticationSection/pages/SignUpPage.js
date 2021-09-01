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
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import sjcl from "sjcl";

import { serverUrl } from "../../../utils/serverUrl";

import { institutes } from "../../../utils/constants";
import signupValidator from "../../../utils/signupValidator";

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

function SignUpPage() {
  const history = useHistory();
  const classes = useStyles();

  const [institute, setInstitute] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupChecker, setSignupChecker] = useState({
    email: {
      error: false,
      messages: [],
    },
    password: {
      error: false,
      messages: [],
    },
    institute: {
      error: false,
      messages: [],
    },

    confirmPassword: {
      error: false,
      messages: [],
    },
  });

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
                  Account Request Form
                </Typography>
                <br />
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                    var checker = signupValidator(
                      email,
                      password,
                      institute,
                      confirmPassword
                    );
                    if (
                      !checker.email.error &&
                      !checker.password.error &&
                      !checker.institute.error &&
                      !checker.confirmPassword.error
                    ) {
                      const myBitArray = sjcl.hash.sha256.hash(password);
                      const myHash = sjcl.codec.hex.fromBits(myBitArray);
                      handleSignUp(e, {
                        institute: {
                          institute: institute.institute,
                          abbv: institute.abbv,
                        },
                        email,
                        password: myHash,
                        uri: `${institute.abbv}.png`,
                        verified: true,
                        type: institute.type,
                        notificationList: [],
                      });
                    }
                    setSignupChecker(checker);
                  }}
                >
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.field}
                    label="Email"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={signupChecker.email.error}
                    helperText={
                      signupChecker.email.error
                        ? signupChecker.email.messages
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
                    error={signupChecker.password.error}
                    value={password}
                    type="password"
                    helperText={
                      signupChecker.password.error
                        ? signupChecker.password.messages
                        : null
                    }
                  />
                  <TextField
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={classes.field}
                    label="Confirm Password"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    error={signupChecker.confirmPassword.error}
                    value={confirmPassword}
                    type="password"
                    helperText={
                      signupChecker.confirmPassword.error
                        ? signupChecker.confirmPassword.messages
                        : null
                    }
                  />
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
                    error={signupChecker.institute.error}
                    helperText={
                      signupChecker.institute.error
                        ? signupChecker.institute.messages[0]
                        : null
                    }
                  >
                    {institutes.map((institute) => (
                      <MenuItem key={institute.abbv} value={institute}>
                        {institute.institute}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                    size="medium"
                  >
                    SIGN UP
                  </Button>
                  <Divider />
                  <Button
                    color="primary"
                    onClick={() => {
                      history.push("/");
                    }}
                    size="medium"
                  >
                    Already have an Account? Login Here!
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

export default SignUpPage;
