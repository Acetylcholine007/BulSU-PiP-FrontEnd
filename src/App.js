import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import "animate.css";
import "./App.css";
import MainWrapper from "./mainWrapper/pages/MainWrapper";
import LogInPage from "./sections/authenticationSection/pages/LogInPage";
import { AuthContext } from "./contexts/AuthContext";
import { InstituteContext } from "./contexts/InstituteContext";
import DateFnsUtils from "@date-io/date-fns";
import NotFoundPage from "./shared/pages/NotFoundPage";
import { Account } from "./utils/bulsupis_mw";
import SignUpWrapper from "./sections/authenticationSection/wrappers/SignUpWrapper";
import ErrorComponent from "./shared/components/ErrorComponent";
import { SnackbarContext } from "./contexts/SnackbarContext";
import { DialogContext } from "./contexts/DialogContext";
import AppSnackbar from "./shared/components/AppSnackbar";
import AppDialog from "./shared/components/AppDialog";
import UserRoutes from "./routes/UserRoutes";
import EditorRoutes from "./routes/EditorRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const theme = createTheme({
  palette: {
    primary: {
      light: "#800000",
      main: "#800000",
      dark: "#800000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#ffe082",
      main: "#ffe082",
      dark: "#ffe082",
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

  const mainRoutes = (userType) => {
    switch (userType) {
      case 0:
        return <UserRoutes />;
      case 1:
        return <EditorRoutes />;
      case 2:
        return <AdminRoutes />;
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

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
                {!error && !isLoggedIn && (
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
                {!error && isLoggedIn && user && !error && (
                  <Router>
                    <MainWrapper>{mainRoutes(user.type)}</MainWrapper>
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
