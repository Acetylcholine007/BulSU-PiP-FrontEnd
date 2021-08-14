import { Typography } from "@material-ui/core";
import React from "react";

import AdminProject from "./AdminProject";
import ClientProject from "./ClientProject";

function ProjectPage({user}) {
  switch (user.type) {
    case "Client":
      return <ClientProject user = {user} />;
    case "Admin":
      return <AdminProject user = {user} />;
    default:
      return <Typography component="h1">Invalid user type</Typography>;
  }
}

export default ProjectPage;
