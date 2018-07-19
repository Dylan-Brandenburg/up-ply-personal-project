import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Teams from "./Teams/Teams";
import Users from "./Users/Users";

class AdminPanel extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>AdminPanel</h1>
          <Link to={"/dashboard/AdminPanel/teams"}>
            <FontAwesomeIcon icon="users" />
          </Link>
          {/* <Link to={"/dashboard/AdminPanel/project"}>
            <FontAwesomeIcon icon="folder-open" />
          </Link> */}
          {"       "}
          <Link to={"/dashboard/AdminPanel/users"}>
            <FontAwesomeIcon icon="user-cog" />
          </Link>
        </div>
        <div> {this.props.children}</div>
      </div>
    );
  }
}
export default AdminPanel;
