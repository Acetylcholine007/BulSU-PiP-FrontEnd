import React from "react";
import { Typography } from "@material-ui/core";

import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";

function DashboardPage({ user }) {
  switch (user.type) {
    case "Client":
      return <ClientDashboard user = {user}/>;
    case "Admin":
      return <AdminDashboard user = {user}/>;
    default:
      return <Typography variant="h3">Invalid user type</Typography>;
  }
}

export default DashboardPage;
