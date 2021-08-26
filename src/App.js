import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import "./App.css";
import MainWrapper from "./mainWrapper/pages/MainWrapper";
import LogInPage from "./sections/authenticationSection/pages/LogInPage";
import SignUpPage from "./sections/authenticationSection/pages/SignUpPage";
import DashboardPage from "./sections/dashboardSection/pages/DashboardPage";
import AccountPage from "./sections/accountSection/pages/AccountPage";
import NotificationPage from "./sections/notificationSection/pages/NotificationPage";
import NotFound from "./shared/pages/NotFound";
import ProjectEditor from "./sections/projectSection/pages/ProjectEditor";
import ProjectEditorWrapper from "./sections/projectSection/wrappers/ProjectEditorWrapper";
import { AuthContext } from "./contexts/AuthContext";
import { ProjectContext } from "./contexts/ProjectContext";
import LoadingComponent from "./shared/components/LoadingComponent";
import DateFnsUtils from "@date-io/date-fns";
import InstitutePage from "./sections/projectSection/pages/InstitutePage";
import AdminProjectViewer from "./sections/projectSection/wrappers/AdminProjectViewer";
import ClientProjectViewer from "./sections/projectSection/wrappers/ClientProjectViewer";
import ClientInstituteViewer from "./sections/projectSection/wrappers/ClientInstituteViewer";
import AdminInstituteViewer from "./sections/projectSection/wrappers/AdminInstituteViewer";

const theme = createTheme({
  palette: {
    primary: {
      light: "#800000",
      main: "#800000",
      dark: "#800000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#F7CC00",
      main: "#F7CC00",
      dark: "#F7CC00",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);

  if (user) {
  }

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <ProjectContext.Provider
        value={{ projects: projects, setProjects: setProjects }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            {!user && (
              <Router>
                <Switch>
                  <Route exact path="/signup">
                    <SignUpPage />
                  </Route>
                  <Route path="/">
                    <LogInPage />
                  </Route>
                  <Route exact path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </Router>
            )}
            {user && !projects && <LoadingComponent />}
            {user && projects && (
              <Router>
                <MainWrapper>
                  <Switch>
                    <Route exact path="/">
                      <DashboardPage />
                    </Route>
                    <Route exact path="/dashboard">
                      <DashboardPage />
                    </Route>
                    <Route exact path="/accounts">
                      <AccountPage />
                    </Route>
                    <Route exact path="/projects">
                      <ClientInstituteViewer />
                    </Route>
                    <Route exact path="/projects/new">
                      <ProjectEditorWrapper isNew = {true} />
                    </Route>
                    <Route exact path="/projects/:id">
                      <ClientProjectViewer />
                    </Route>
                    <Route exact path="/projects/:id/edit">
                      <ProjectEditorWrapper isNew = {false} />
                    </Route>
                    <Route exact path="/institutes">
                      <InstitutePage />
                    </Route>
                    <Route exact path="/institutes/:instituteId">
                      <AdminInstituteViewer />
                    </Route>
                    <Route exact path="/institutes/:instituteId/:projectId">
                      <AdminProjectViewer />
                    </Route>
                    <Route exact path="/notifications">
                      <NotificationPage />
                    </Route>
                    <Route exact path="*">
                      <NotFound />
                    </Route>
                  </Switch>
                </MainWrapper>
              </Router>
            )}
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </ProjectContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
