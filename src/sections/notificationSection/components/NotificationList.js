import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Card
} from "@material-ui/core";
import { useState } from "react";
import NotificationModal from "./NotificationModal";

function NotificationList({user: {notificationList}}) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const selectNotification = (notification) => {
    setNotification(notification);
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    tableHead: {
      background: theme.palette.tertiary.main,
      borderRadius: '5px 5px 0px 0px',
    },
    card: {
      marginBottom: 15
    }
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
            </TableRow>
          </TableHead>
          <TableBody>
            {notificationList.map((notification) => (
              <TableRow
                hover
                onClick={(e) => {
                  selectNotification(notification);
                }}
                key={notification.id}
              >
                <TableCell>{notification.header}</TableCell>
                <TableCell>{notification.author}</TableCell>
                <TableCell>{(new Date(notification.datetime)).toDateString()}</TableCell>
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
