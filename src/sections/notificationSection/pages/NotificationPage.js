import { useContext } from "react";
import { Typography } from "@material-ui/core";

import AdminNotification from "./AdminNotification";
import ClientNotification from "./ClientNotification";
import { AuthContext } from "../../../contexts/AuthContext";

function NotificationPage() {
  const {user} = useContext(AuthContext);

  switch (user.type) {
    case "Client":
      return <ClientNotification />;
    case "Admin":
      return <AdminNotification />;
    default:
      return <Typography component="h1">Invalid user type</Typography>;
  }
}

export default NotificationPage;
