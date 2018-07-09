import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { getUser } from "../../redux/ducks/userReducer";
import Button from "../Button/Button";
import "./Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  render() {
    let first_name = this.props.user[0]
      ? this.props.user[0].first_name
      : "First";
    let last_name = this.props.user[0] ? this.props.user[0].last_name : "Last";
    let role = this.props.user[0] ? this.props.user[0].role : "role";
    return (
      <div>
        <div className="nav-bar">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <h2>TeamName</h2>
              <div className="account-image">
                <AccountCircle style={{ fontSize: "300%" }} />
              </div>
              <h3>
                {first_name}
                {"    "}
                {last_name}
              </h3>

              <div>
                <p>{role}</p>
              </div>
              <hr />
              <div className="nav-list">
                <Link to="/dashboard/view">
                  <div>
                    <FontAwesomeIcon icon="tachometer-alt" />Dashboard
                  </div>
                </Link>
                <Link to="/dashboard/teams">
                  <div>
                    <FontAwesomeIcon icon="users" />Teams
                  </div>
                </Link>

                <Link to="/dashboard/createteam">
                  <div>
                    <FontAwesomeIcon icon="users" />Create team
                  </div>
                </Link>

                <Link to="/dashboard/projects">
                  <div>
                    <FontAwesomeIcon icon="folder-open" />Projects
                  </div>
                </Link>
                <Link to="/dashboard/tasks">
                  <div>
                    <FontAwesomeIcon icon="clipboard-list" />Tasks
                  </div>
                </Link>
                <Link to="/dashboard/settings">
                  <div>
                    <FontAwesomeIcon icon="cog" />Settings
                  </div>
                </Link>
                <a href="http://localhost:3001/logout">
                  <ExitToApp />
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  {}
)(Navbar);
