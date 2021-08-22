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
} from "@material-ui/core";
import { Edit, ExitToApp } from "@material-ui/icons";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

function AccountMenu({ showDialog, anchorEl, setShowDialog, setAnchorEl, setOpen }) {
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
  const { user, setUser } = useContext(AuthContext);

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
          avatar={<Avatar></Avatar>}
          title={
            <Typography variant="h6">{`${user.suc} ${user.college}`}</Typography>
          }
          subheader={<Typography variant="body2">{user.email}</Typography>}
          className={classes.cardHeader}
        />
        <CardContent style={{ padding: "0px" }}>
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
                startIcon={<Edit />}
              >
                Edit Account
              </Button>
            </ListItem>
            <ListItem>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  history.push("/");
                  setUser(null);
                  setAnchorEl(null);
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
