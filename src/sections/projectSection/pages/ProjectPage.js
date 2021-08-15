import { Typography } from "@material-ui/core";
import React from "react";

import { useContext } from "react";

import AdminProject from "./AdminProject";
import ClientProject from "./ClientProject";
import { AuthContext } from "../../../contexts/AuthContext";

function ProjectPage() {
  const {user} = useContext(AuthContext);

  switch (user.type) {
    case "Client":
      return <ClientProject />;
    case "Admin":
      return <AdminProject />;
    default:
      return <Typography component="h1">Invalid user type</Typography>;
  }
}

export default ProjectPage;
