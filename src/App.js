import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { amber, blue } from "@material-ui/core/colors";
import { useState } from "react";

import "./App.css";
import LogInPage from "./authenticationSection/pages/LogInPage";
import MainWrapper from "./mainWrapper/pages/MainWrapper";
import Dashboard from "./dashboardSection/pages/Dashboard";
import Account from "./accountSection/pages/Account";
import Project from "./projectSection/pages/Project";
import Notification from "./notificationSection/pages/Notification";
import NotFound from "./shared/pages/NotFound";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: amber,
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

  return (
    <ThemeProvider theme={theme}>
      {!user && <LogInPage setUser={setUser} />}
      {user && (
        <Router>
          <MainWrapper user={user} setUser={setUser}>
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/accounts">
                <Account />
              </Route>
              <Route exact path="/accounts/:id"></Route>
              <Route exact path="/projects">
                <Project />
              </Route>
              <Route exact path="/projects/:id"></Route>
              <Route exact path="/notifications">
                <Notification />
              </Route>
              <Route exact path="/notifications/:id"></Route>
              <Route exact path="*">
                <NotFound />
              </Route>
            </Switch>
          </MainWrapper>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
