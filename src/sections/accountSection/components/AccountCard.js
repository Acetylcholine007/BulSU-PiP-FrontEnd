import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

function AccountCard({ user, selectAccount }) {
    const useStyles = makeStyles((theme) => ({
        cardHeader: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText
        }
    }))
    const classes = useStyles();

  return (
    <Card onClick = {() => selectAccount(user)}>
      <CardHeader avatar={<Avatar></Avatar>} title={user.suc} className = {classes.cardHeader}/>
      <CardContent>
        <Typography variant="h6">{user.college}</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Verify</Button>
        <Button variant="contained">Reject</Button>
        <Button variant="contained">Delete</Button>
      </CardActions>
    </Card>
  );
}

export default AccountCard;
