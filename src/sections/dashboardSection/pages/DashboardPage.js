import { useContext } from "react";
import { Typography } from "@material-ui/core";

import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import { AuthContext } from "../../../contexts/AuthContext";

function DashboardPage() {
  const { user } = useContext(AuthContext);
  
  switch (user.type) {
    case 0:
      return <ClientDashboard />;
    case 1:
      return <AdminDashboard />;
    default:
      return <Typography variant="h3">Invalid user type</Typography>;
  }
}

export default DashboardPage;
