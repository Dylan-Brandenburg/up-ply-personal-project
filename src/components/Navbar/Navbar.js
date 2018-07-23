import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import logo from "../../logo.png";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getUser } from "../../redux/ducks/userReducer";

import Chat from "../Chat/Chat";
import "./Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false
    };
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const styles = {
      list: {
        width: 250
      },
      fullList: {
        width: "auto"
      }
    };

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
              <img src={logo} className="Navbar-logo" alt="logo" />
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
              <p>{role}</p>
              <div className="nav-list">
                <Link style={{ textDecoration: "none" }} to="/dashboard/view">
                  <div className="nav-menuelist">
                    <p>
                      <FontAwesomeIcon icon="tachometer-alt" />
                      Dashboard
                    </p>
                  </div>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/dashboard/projects"
                >
                  <div className="nav-menuelist">
                    <p>
                      <FontAwesomeIcon icon="folder-open" />Projects
                    </p>
                  </div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/dashboard/tasks">
                  <div className="nav-menuelist">
                    <p>
                      <FontAwesomeIcon icon="clipboard-list" />Tasks
                    </p>
                  </div>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/dashboard/settings"
                >
                  <div className="nav-menuelist">
                    <p>
                      <FontAwesomeIcon icon="cog" />Settings
                    </p>
                  </div>
                </Link>

                {admin == true ? (
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/dashboard/AdminPanel"
                  >
                    <div className="nav-menuelist">
                      <p>
                        <FontAwesomeIcon icon="toolbox" />Overview
                      </p>
                    </div>
                  </Link>
                ) : null}

                <a
                  className="nav-menuelist"
                  href="http://localhost:3001/logout"
                >
                  <ExitToApp />
                </a>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="navbar-chat">
          <Button onClick={this.toggleDrawer("bottom", true)}>Chat</Button>
          <Drawer
            anchor="bottom"
            open={this.state.bottom}
            onClose={this.toggleDrawer("bottom", false)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer("bottom", false)}
              onKeyDown={this.toggleDrawer("bottom", false)}
            />
            <Chat />
          </Drawer>
          {/* <Chat /> */}
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
