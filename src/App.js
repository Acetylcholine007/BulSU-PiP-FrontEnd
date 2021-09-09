import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useState, useEffect } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import "animate.css";
import "./App.css";
import MainWrapper from "./mainWrapper/pages/MainWrapper";
import LogInPage from "./sections/authenticationSection/pages/LogInPage";
import ProjectEditorWrapper from "./sections/projectSection/wrappers/ProjectEditorWrapper";
import { AuthContext } from "./contexts/AuthContext";
import { InstituteContext } from "./contexts/InstituteContext";
import DateFnsUtils from "@date-io/date-fns";
import AdminProjectViewer from "./sections/projectSection/wrappers/AdminProjectViewer";
import ClientProjectViewer from "./sections/projectSection/wrappers/ClientProjectViewer";
import ClientInstituteViewer from "./sections/projectSection/wrappers/ClientInstituteViewer";
import AdminInstituteViewer from "./sections/projectSection/wrappers/AdminInstituteViewer";
import NotFoundPage from "./shared/pages/NotFoundPage";
import { Account } from "./utils/bulsupis_mw";
import ClientDashboard from "./sections/dashboardSection/wrappers/ClientDashboard";
import AdminDashboard from "./sections/dashboardSection/wrappers/AdminDashboard";
import AccountsWrapper from "./sections/accountSection/wrappers/AccountsWrapper";
import NotificationWrapper from "./sections/notificationSection/wrappers/NotificationWrapper";
import ProjectEditor from "./sections/projectSection/pages/ProjectEditor";
import SignUpWrapper from "./sections/authenticationSection/wrappers/SignUpWrapper";
import ErrorComponent from "./shared/components/ErrorComponent";
import InstituteWrapper from "./sections/projectSection/wrappers/InstituteWrapper";
import { SnackbarContext } from "./contexts/SnackbarContext";
import { DialogContext } from "./contexts/DialogContext";
import AppSnackbar from "./shared/components/AppSnackbar";
import AppDialog from "./shared/components/AppDialog";

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
    tertiary: {
      light: "#E0E0E0",
      main: "#9E9E9E",
      dark: "#616161",
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

function App({ isLoggedIn, setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const [institute, setInstitute] = useState(null);
  const [error, setError] = useState(null);
  const [snackbarData, setSnackbarData] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const getUserData = async () =>
    await Account.getInfo()
      .then(({ simple, full }) => {
        if (simple) {
          setUser(simple.data);
        } else {
          setUser(simple);
          setError(full);
        }
      })
      .catch((err) => {
        setError(err.message);
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
        <SnackbarContext.Provider
          value={{
            snackbarData: snackbarData,
            setSnackbarData: setSnackbarData,
            showSnackbar: showSnackbar,
            setShowSnackbar: setShowSnackbar,
          }}
        >
          <DialogContext.Provider
            value={{
              dialogData: dialogData,
              setDialogData: setDialogData,
              showDialog: showDialog,
              setShowDialog: setShowDialog,
            }}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={theme}>
                {!isLoggedIn && (
                  <Router>
                    <Switch>
                      <Route exact path="/signup">
                        <SignUpWrapper />
                      </Route>
                      <Route path="/">
                        <LogInPage />
                      </Route>
                      <Route exact path="*">
                        <NotFoundPage />
                      </Route>
                    </Switch>
                  </Router>
                )}
                {error && <ErrorComponent message={error} />}
                {isLoggedIn && user && !error && (
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
                    </MainWrapper>
                  </Router>
                )}
                {snackbarData && <AppSnackbar />}
                {dialogData && <AppDialog />}
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </DialogContext.Provider>
        </SnackbarContext.Provider>
      </InstituteContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
