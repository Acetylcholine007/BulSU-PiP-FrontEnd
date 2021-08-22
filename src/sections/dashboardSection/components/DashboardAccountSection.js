import {
  Avatar,
  Button,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Add, ViewList } from "@material-ui/icons";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

const useStyles = makeStyles({
  btn: {
    marginRight: 13,
  },
  btn1: {
    marginLeft: 13,
  },
  avtr: {
    width: 'auto',
    height: 'auto',
    marginTop: 25,
  },
  txt: {
    marginTop: 55,
  },
  txt1: {
    marginTop: 25,
  },
});

function DashboardAccountSection() {
  const history = useHistory();
  const classes = useStyles();
  const {user} = useContext(AuthContext);

  return (
    <Grid container>
      <Grid item xs={3} align="center">
        <Avatar
          className={classes.avtr}
          src="images/pf.png"
        ></Avatar>
      </Grid>
      <Grid item xs={9}>
        <Typography className={classes.txt} variant="h3">
          Testing
        </Typography>
        <Divider style={{marginTop: 5, marginBottom: 5}}/>
        <Typography variant="h5">{user.suc}</Typography>
        <Typography variant="h5">{user.college}</Typography>
      </Grid>
      <Grid item xs={6} align="end">
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => history.push("/projects")}
          startIcon={<ViewList />}
        >
          View Projects
        </Button>
      </Grid>
      <Grid item xs={6} align="start">
        <Button
          className={classes.btn1}
          variant="contained"
          color="secondary"
          onClick={() => history.push("/projects/new")}
          startIcon={<Add />}
        >
          Create Project
        </Button>
      </Grid>
    </Grid>
  );
}

export default DashboardAccountSection;
