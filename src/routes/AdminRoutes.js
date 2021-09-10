import React from "react";
import { Route, Switch } from "react-router";

import AccountsWrapper from "../sections/accountSection/wrappers/AccountsWrapper";
import AdminDashboard from "../sections/dashboardSection/wrappers/AdminDashboard";
import NotificationWrapper from "../sections/notificationSection/wrappers/NotificationWrapper";
import AdminInstituteViewer from "../sections/projectSection/wrappers/AdminInstituteViewer";
import AdminProjectViewer from "../sections/projectSection/wrappers/AdminProjectViewer";
import InstituteWrapper from "../sections/projectSection/wrappers/InstituteWrapper";
import NotFoundPage from "../shared/pages/NotFoundPage";

function AdminRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <AdminDashboard />
      </Route>
      <Route exact path="/dashboard">
        <AdminDashboard />
      </Route>
      <Route exact path="/accounts">
        <AccountsWrapper />
      </Route>
      <Route exact path="/institutes">
        <InstituteWrapper />
      </Route>
      <Route exact path="/institutes/:instituteId">
        <AdminInstituteViewer />
      </Route>
      <Route exact path="/institutes/:instituteId/:projectId">
        <AdminProjectViewer />
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

export default AdminRoutes;
