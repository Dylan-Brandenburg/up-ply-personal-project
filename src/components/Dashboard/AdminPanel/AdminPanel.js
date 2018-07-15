import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Teams from "./Teams/Teams";
import Users from "./Users/Users";

class AdminPanel extends Component {
  render() {
    return (
      <div>
        <h1>AdminPanel</h1>
        <Teams />
        <Users />
      </div>
    );
  }
}
export default AdminPanel;
