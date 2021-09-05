import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Popover,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { Edit, ExitToApp, Lock } from "@material-ui/icons";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { Account } from "../../utils/bulsupis_mw";
import { accountTypes } from "../../utils/constants";
import { serverUrl } from "../../utils/serverUrl";

function AccountMenu({
  showDialog,
  anchorEl,
  setShowDialog,
  setAnchorEl,
  setOpen,
}) {
  const useStyles = makeStyles((theme) => {
    return {
      cardHeader: {
        backgroundColor: theme.palette.primary.light,
        color: "white",
      },
      dialogPaper: {
        borderRadius: "10px",
      },
    };
  });

  const classes = useStyles();
  const history = useHistory();
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);

  return (
    <Popover
      id="popover"
      open={showDialog}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        setShowDialog(false);
        setAnchorEl(null);
      }}
      classes={{ paper: classes.dialogPaper }}
    >
      <Card style={{ minimumWidth: "250px" }}>
        <CardHeader
          avatar={<Avatar src={user.institute.profile_img.src}/>}
          title={
            <Typography variant="h6">
              {accountTypes[user.type].label}
            </Typography>
          }
          subheader={<Typography variant="body2">{user.email}</Typography>}
          className={classes.cardHeader}
        />
        <CardContent style={{ padding: 4 }}>
          <List>
            <ListItem>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  setShowDialog(false);
                }}
                className={classes.button}
                fullWidth
                startIcon={<Lock />}
              >
                Change Password
              </Button>
            </ListItem>
            <ListItem>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  history.push("/");
                  Account.logout();
                  setIsLoggedIn(Account.isLoggedIn());
                }}
                className={classes.button}
                fullWidth
                startIcon={<ExitToApp />}
              >
                Log Out
              </Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Popover>
  );
}

export default AccountMenu;
