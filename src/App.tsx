import React, { Component } from "react";
import { ApolloProvider, useQuery } from "react-apollo";

import "./App.css";
import Login from "./pages/Login";
import Free from "./pages/Free";

import Navigation from "./pages/Navigation";

import { ThemeProvider } from "@material-ui/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import client from "./config/apollo";
import theme from "./config/theme";
import MomentUtils from "@date-io/moment";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Users from "./pages/User/Users";
import TimeRoles from "./pages/TimeRole/TimeRoles";
import TimeClock from "./pages/TimeClock/TimeClock";
import TimeReport from "./pages/TimeReport/TimeReport";

import Me from "./components/Me";
import permhelper from "./helpers/permhelper";
import NewPunchPage from "./pages/QuickPunch/NewPunchPage";
import { NEW_GET_ME } from "./gql/queries/userQuery";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <ApolloProvider client={client}>
            <Router>
              <>
                <div className="background" />
                <Navigation />
                <RedirectLoggedIn pathNot={["Timeclock", "Login", "Home"]} />
                <RedirectRoute path="/Admin" permission="ADMIN" />
                <div style={{ padding: "12px" }}>
                  <Switch>
                    <Route exact path="/timeclock" component={NewPunchPage} />

                    <Route exact path="/TimeReport" component={TimeReport} />
                    <Route
                      exact
                      path="/Admin/TimeCards"
                      component={TimeClock}
                    />

                    <Route exact path="/login" component={Login} />
                    <Route exact path="/Admin/Users" component={Users} />

                    <Route
                      exact
                      path="/Admin/TimeRoles"
                      component={TimeRoles}
                    />

                    <Route component={Free} />
                  </Switch>
                </div>
              </>
            </Router>
          </ApolloProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

const RedirectLoggedIn: React.FC<{ pathNot: string[] }> = ({ pathNot }) => {
  const { loading, data } = useQuery(NEW_GET_ME);
  if (loading) return null;
  return (
    <Route
      render={({ location: { pathname } }) => {
        if (!!data.me || !!pathNot.find(path => path === pathname.substr(1)))
          return null;
        else
          return (
            <Redirect
              to={{
                pathname: "/Home"
              }}
            />
          );
      }}
    />
  );
};

function RedirectRoute({ permission, ...rest }: any) {
  return (
    <Me>
      {({ me = {}, loading }: any) => (
        <Route
          {...rest}
          render={() => {
            if (loading) return null;
            return (
              <>
                {me && permhelper(me.permissions, permission) ? null : (
                  <Redirect
                    to={{
                      pathname: "/Home"
                    }}
                  />
                )}
              </>
            );
          }}
        />
      )}
    </Me>
  );
}

export default App;
