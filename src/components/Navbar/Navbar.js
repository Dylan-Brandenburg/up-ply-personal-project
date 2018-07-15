import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { getUser } from "../../redux/ducks/userReducer";
import Chat from "../Chat/Chat";
import "./Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  render() {
    let first_name = this.props.user[0]
      ? this.props.user[0].first_name
      : "First";
    let last_name = this.props.user[0] ? this.props.user[0].last_name : "Last";
    let role = this.props.user[0] ? this.props.user[0].role : "role";
    let profile_picture = this.props.user[0]
      ? this.props.user[0].profile_picture
      : "profile picture";
    let admin = this.props.user[0] ? this.props.user[0].admin : "admin";

    return (
      <div>
        <div className="nav-bar">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <h1>UpPly</h1>
              <div className="account-image">
                <img
                  className="profilePicture"
                  src={profile_picture}
                  alt="User Profile Picture"
                />
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

                {admin == true ? (
                  <Link to="/dashboard/AdminPanel">
                    <div>
                      <FontAwesomeIcon icon="toolbox" />Admin Panel
                    </div>
                  </Link>
                ) : null}

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
