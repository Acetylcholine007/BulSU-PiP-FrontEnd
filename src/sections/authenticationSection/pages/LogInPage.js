import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  makeStyles,
  TextField,
  ThemeProvider,
  Typography,

} from "@material-ui/core";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import sjcl from "sjcl";

import { serverUrl } from "../../../utils/serverUrl";
import { User } from "../../../utils/models";
import { AuthContext } from "../../../contexts/AuthContext";
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';



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
   width:180,
   height:180,
   marginTop: theme.spacing(5),
   marginRight: theme.spacing(10)
 },
 
 toolbar: theme.mixins.toolbar,
  date:{
    flexGrow: 1
  },
 title:{
   marginTop:40,
 }
 
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
       <AppBar
    className={classes.appbar}
    elevation={0}
    color="transparent"
    >
      <Toolbar>
      <Avatar
        className={classes.avtr} 
        src="favicon.ico"
        ></Avatar>
        <Typography
        className={classes.date}
        variant="h2"
        align="left"
        >
          Planning and Development Office
        </Typography>
        <Typography>
          
        </Typography>
        <Avatar
        className={classes.avtr} 
        src="favicon.ico"
        ></Avatar>
      </Toolbar>
    </AppBar>
      <Grid container>
      <Grid item xs={12} md={5} key="description">
        <Typography variant="h2"
        align="left"
        >
        
        </Typography>
        <Typography
        variant="h5"
        align="left"
        >
        
        </Typography>
      </Grid>
      <Grid item xs={12} md={5} key="description">
      
        </Grid>
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
                  size = "medium"
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
                  size = "medium"
                >
                  Sign-Up
                </Button>
                <Button
                size= "extra small">
                  forgot password?
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5} key="description">
          <Typography
          className={classes.title}
          variant="h2"
          align="right"
          >BulSU PiPs</Typography>
          <Typography
           
          variant="h4"
           align="right"
          >BulSU-PDO</Typography>
          <Typography
            
          variant="h4"
           align="right"
          >Investment</Typography>
          <Typography
            
          variant="h4"
           align="right"
          >Program</Typography>
          <Typography
           
          variant="h4"
           align="right"
          >System</Typography>
        </Grid>
      </Grid>
    </Container>
    
    
  );
 
}

export default LogInPage;
