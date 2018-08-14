import React from "react";
import { Switch, Route } from "react-router-dom";
import Splash from "./components/Splash/Splash";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminPanel from "./components/Dashboard/AdminPanel/AdminPanel";
import Projects from "./components/Dashboard/Projects/Projects";
import Tasks from "./components/Dashboard/Tasks/Tasks";
import Teams from "./components/Dashboard/AdminPanel/Teams/Teams";
import Project from "./components/Dashboard/AdminPanel/Teams/Team/Project/Project";
import Createteam from "./components/Dashboard/Createteam/Createteam";
import Settings from "./components/Dashboard/Settings/Settings";
import DashboardView from "./components/Dashboard/DashboardView/DashboardView";
import Chat from "./components/Chat/Chat";
import Users from "./components/Dashboard/AdminPanel/Users/Users";
import CreateProject from "./components/Dashboard/AdminPanel/Teams/Team/Project/CreateProject/CreateProject";

export default (
  <Switch>
    <Route exact path="/" component={Splash} />
    <Route path="/Chat" component={Chat} />

    <Route
      path="/dashboard/"
      render={() => {
        return (
          <Dashboard>
            <Switch>
              <Route path="/dashboard/view" component={DashboardView} />
              <Route path="/dashboard/projects" component={Projects} />
              <Route path="/dashboard/tasks" component={Tasks} />
              <Route path="/dashboard/settings" component={Settings} />
              <Route
                exact
                path="/dashboard/createteam"
                component={Createteam}
              />
              <Route
                path="/dashboard/AdminPanel"
                render={() => {
                  return (
                    <AdminPanel>
                      <Switch>
                        <Route
                          exact
                          path="/dashboard/AdminPanel/teams"
                          component={Teams}
                        />

                        <Route
                          exact
                          path="/dashboard/AdminPanel/teams/:id"
                          component={Project}
                        />
                        <Route
                          path="/dashboard/AdminPanel/users"
                          component={Users}
                        />
                        <Route
                          path="/dashboard/AdminPanel/createproject"
                          component={CreateProject}
                        />
                      </Switch>
                    </AdminPanel>
                  );
                }}
              />
            </Switch>
          </Dashboard>
        );
      }}
    />
  </Switch>
);
