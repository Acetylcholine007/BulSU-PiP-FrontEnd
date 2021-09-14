import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Card,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useContext, useState } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import EmptyTableContent from "../../../shared/components/EmptyTableContent";
import { Notifications } from "../../../utils/bulsupis_mw";
import NotificationModal from "./NotificationModal";

function NotificationList({ user: { notificationList } }) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const { setShowSnackbar, setSnackbarData } = useContext(SnackbarContext);
  const { setIsLoading } = useContext(LoadingContext);

  const selectNotification = (notification) => {
    setNotification(notification);
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    tableHead: {
      background: theme.palette.grey[500],
      borderRadius: "5px 5px 0px 0px",
    },
    card: {
      marginBottom: 15,
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <TableContainer>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Header</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date and Time</TableCell>
              <TableCell style={{ padding: 0, width: "8%" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificationList.length == 0 && (
              <EmptyTableContent message="No notifications" span={4} />
            )}
            {notificationList.length !== 0 &&
              notificationList.map((notification) => (
                <TableRow hover key={notification.id}>
                  <TableCell
                    onClick={(e) => {
                      selectNotification(notification);
                    }}
                  >
                    {notification.header}
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      selectNotification(notification);
                    }}
                  >
                    {notification.author}
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      selectNotification(notification);
                    }}
                  >
                    {new Date(notification.datetime).toDateString()}
                  </TableCell>
                  <TableCell style={{ padding: 0 }}>
                    <IconButton
                      onClick={() => {
                        setIsLoading(true);
                        Notifications.delete(notification.id)
                          .then(({ simple, full }) => {
                            if (simple) {
                              setSnackbarData({
                                type: 0,
                                message: "Notification deleted",
                              });
                            } else {
                              console.log(full);
                              setSnackbarData({
                                type: 3,
                                message: full,
                              });
                            }
                          })
                          .catch((err) =>
                            setSnackbarData({
                              type: 3,
                              message: err.message,
                            })
                          )
                          .finally(() => {
                            setIsLoading(false);
                            setShowSnackbar(true);
                          });
                      }}
                    >
                      <Delete style={{ color: "#f44336" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {notification && (
        <NotificationModal
          open={open}
          setOpen={setOpen}
          notification={notification}
        />
      )}
    </Card>
  );
}

export default NotificationList;
