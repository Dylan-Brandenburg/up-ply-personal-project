import React, { Component } from "react";
import Taskview from "./Taskview/Taskview";
import ProjectView from "./Projectview/Projectview";

export default class DashboardView extends Component {
  render() {
    return (
      <div>
        <div>
          <ProjectView />
        </div>
        <div>
          <Taskview />
        </div>
      </div>
    );
  }
}
