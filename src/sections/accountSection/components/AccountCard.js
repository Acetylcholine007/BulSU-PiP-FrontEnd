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
import { serverUrl } from "../../../utils/serverUrl";

function AccountCard({ user, selectAccount, setAccounts, accounts }) {
  const useStyles = makeStyles((theme) => ({
    cardHeader: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  }));
  const classes = useStyles();

  const toggleAccountStatus = () => {
    fetch(`${serverUrl}users/${user.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ...user,
        verified: !user.verified,
      }),
    }).then(() => {
      accounts[accounts.indexOf(user)].verified = !user.verified;
      setAccounts([...accounts])
    });
  };

  const deleteAccount = () => {
    fetch(`${serverUrl}users/${user.id}`, {
      method: "DELETE"
    }).then(() => {
      setAccounts(accounts.filter((account) => account.id !== user.id))
    });
  }

  return (
    <Card>
      <CardHeader
        onClick={() => selectAccount(user)}
        avatar={<Avatar></Avatar>}
        title={user.suc}
        className={classes.cardHeader}
      />
      <CardContent>
        <Typography variant="h6">{user.college}</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={toggleAccountStatus}>
          {user.verified ? "Suspend" : "Verify"}
        </Button>
        <Button variant="contained" onClick={deleteAccount}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default AccountCard;
