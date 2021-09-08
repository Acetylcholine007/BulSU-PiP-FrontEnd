import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useState, useEffect } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import "animate.css";
import "./App.css";
import MainWrapper from "./mainWrapper/pages/MainWrapper";
import LogInPage from "./sections/authenticationSection/pages/LogInPage";
import SignUpPage from "./sections/authenticationSection/pages/SignUpPage";
import ProjectEditorWrapper from "./sections/projectSection/wrappers/ProjectEditorWrapper";
import { AuthContext } from "./contexts/AuthContext";
import { InstituteContext } from "./contexts/InstituteContext";
import DateFnsUtils from "@date-io/date-fns";
import InstitutePage from "./sections/projectSection/pages/InstitutePage";
import AdminProjectViewer from "./sections/projectSection/wrappers/AdminProjectViewer";
import ClientProjectViewer from "./sections/projectSection/wrappers/ClientProjectViewer";
import ClientInstituteViewer from "./sections/projectSection/wrappers/ClientInstituteViewer";
import AdminInstituteViewer from "./sections/projectSection/wrappers/AdminInstituteViewer";
import NotFound from "./shared/pages/NotFound";
import { Account } from "./utils/bulsupis_mw";
import ClientDashboard from "./sections/dashboardSection/wrappers/ClientDashboard";
import AdminDashboard from "./sections/dashboardSection/wrappers/AdminDashboard";
import AccountsWrapper from "./sections/accountSection/wrappers/AccountsWrapper";
import NotificationWrapper from "./sections/notificationSection/wrappers/NotificationWrapper";
import ProjectEditor from "./sections/projectSection/pages/ProjectEditor";

const theme = createTheme({
  palette: {
    primary: {
      light: "#800000",
      main: "#800000",
      dark: "#800000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#ffab40",
      main: "#ffab40",
      dark: "#ffab40",
      contrastText: "#000000",
    },
    tertiary: {
      light: "#E0E0E0",
      main: "#9c9c9c",
      dark: "#e6e6e6",
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
  const [isLoggedIn, setIsLoggedIn] = useState(Account.isLoggedIn());
  const [institute, setInstitute] = useState(null);

  const getUserData = async () =>
    await Account.getInfo()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setUser(null);
      });

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      <InstituteContext.Provider
        value={{ institute: institute, setInstitute: setInstitute }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            {!Account.isLoggedIn() && (
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
            {Account.isLoggedIn() && user && (
              <Router>
                <MainWrapper>
                  <Switch>
                    <Route exact path="/">
                      {user.type == 0 ? (
                        <ClientDashboard />
                      ) : (
                        <AdminDashboard />
                      )}
                    </Route>
                    <Route exact path="/dashboard">
                      {user.type == 0 ? (
                        <ClientDashboard />
                      ) : (
                        <AdminDashboard />
                      )}
                    </Route>
                    <Route exact path="/accounts">
                      <AccountsWrapper />
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
                      <NotificationWrapper />
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
      </InstituteContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
