import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useContext, useState } from "react";
import NotificationModal from "./NotificationModal";

import { AuthContext } from "../../../contexts/AuthContext";

function NotificationList() {
  const {
    user: { notificationList },
  } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const selectNotification = (notification) => {
    setNotification(notification);
    setOpen(true);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
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
    </Paper>
  );
}

export default NotificationList;
