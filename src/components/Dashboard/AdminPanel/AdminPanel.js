import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import "./AdminPanel.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AdminPanel extends Component {
  render() {
    return (
      <div>
        <div className="admin-panel">
          <h1>Overview</h1>
          <Tooltip title="Teams">
            <Link to={"/dashboard/AdminPanel/teams"}>
              <FontAwesomeIcon icon="users" />
            </Link>
          </Tooltip>
          <Tooltip title="Users">
            <Link to={"/dashboard/AdminPanel/users"}>
              <FontAwesomeIcon icon="user-cog" />
            </Link>
          </Tooltip>
        </div>
        <div> {this.props.children}</div>
      </div>
    );
  }
}
export default AdminPanel;
