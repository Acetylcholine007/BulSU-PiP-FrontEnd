import React from "react";
import { Route, Switch } from "react-router";
import ClientDashboard from "../sections/dashboardSection/wrappers/ClientDashboard";
import NotificationWrapper from "../sections/notificationSection/wrappers/NotificationWrapper";
import ProjectEditor from "../sections/projectSection/pages/ProjectEditor";
import ClientInstituteViewer from "../sections/projectSection/wrappers/ClientInstituteViewer";
import ClientProjectViewer from "../sections/projectSection/wrappers/ClientProjectViewer";
import ProjectEditorWrapper from "../sections/projectSection/wrappers/ProjectEditorWrapper";
import NotFoundPage from "../shared/pages/NotFoundPage";

function UserRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <ClientDashboard />
      </Route>
      <Route exact path="/dashboard">
        <ClientDashboard />
      </Route>
      <Route exact path="/projects">
        <ClientInstituteViewer />
      </Route>
      <Route exact path="/projects/new">
        <ProjectEditor isNew={true} project={null} />
      </Route>
      <Route exact path="/projects/:id">
        <ClientProjectViewer />
      </Route>
      <Route exact path="/projects/:id/edit">
        <ProjectEditorWrapper isNew={false} />
      </Route>
      <Route exact path="/notifications">
        <NotificationWrapper />
      </Route>
      <Route exact path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default UserRoutes;
