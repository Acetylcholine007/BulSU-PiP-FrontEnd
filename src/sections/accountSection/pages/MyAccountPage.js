import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

function MyAccountPage() {
  const useStyles = makeStyles({
    btn: {
      marginRight: 13,
    },
    btn1: {
      marginLeft: 13,
    },
    avtr: {
      width: 200,
      height: 200,
      marginTop: 25,
    },
    txt: {
      marginTop: 55,
    },
    txt1: {
      marginTop: 25,
    },
    pageTitle: {
      flexGrow: 11,
    },
    pageAction: {
      flexGrow: 1,
    },
  });

  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"My Account"}
        </Typography>
        <Button
          variant="contained"
          onClick={() => history.push("/myaccount/edit")}
          className={classes.pageAction}
          startIcon={<Edit />}
        >
          Edit Account
        </Button>
      </Toolbar>
      <Divider />
      <Container>
        <Grid container>
          <Grid item xs={9} align="center">
            <Avatar className={classes.avtr} src="images/pf.png"></Avatar>
          </Grid>
          <Grid container>
            <Grid item xs={9} align="center">
              <Typography className={classes.txt} variant="h3">
                Account Details
              </Typography>
              <Divider />
              <Typography variant="h5">{user.suc}</Typography>
              <Typography variant="h5">{user.college}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default MyAccountPage;
