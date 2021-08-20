import { Avatar, Button, Container, Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import { useContext } from "react";
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
      });

  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h4">My Account</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant = 'contained' onClick = {() => history.push('/myaccount/edit')}>Edit Account</Button>
        </Grid>
        <Grid item xs={9} align="center">
          <Avatar
            className={classes.avtr}
            src="images/pf.png"
          ></Avatar>
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
  );
}

export default MyAccountPage;
