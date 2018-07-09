import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Splash from "./components/Splash/Splash";
import Dashboard from "./components/Dashboard/Dashboard";
import Projects from "./components/Dashboard/Projects/Projects";
import Tasks from "./components/Dashboard/Tasks/Tasks";
import Teams from "./components/Dashboard/Teams/Teams";
import Createteam from "./components/Dashboard/Createteam/Createteam";
import Settings from "./components/Dashboard/Settings/Settings";
import DashboardView from "./components/Dashboard/DashboardView/DashboardView";

export default (
  <Switch>
    <Route exact path="/" component={Splash} />
    <Route path="/createteam" component={Createteam} />

    <Route
      path="/dashboard/"
      render={() => {
        return (
          <Dashboard>
            <Switch>
              <Route path="/dashboard/view" component={DashboardView} />
              <Route path="/dashboard/projects" component={Projects} />
              <Route path="/dashboard/tasks" component={Tasks} />
              <Route path="/dashboard/teams" component={Teams} />
              <Route path="/dashboard/settings" component={Settings} />
              <Route
                exact
                path="/dashboard/createteam"
                component={Createteam}
              />
            </Switch>
          </Dashboard>
        );
      }}
    />
  </Switch>
);
