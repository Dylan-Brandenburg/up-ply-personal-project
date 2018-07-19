import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

// import Projects from "../Projects/Projects";
// import Tasks from "../Tasks/Tasks";
// import Button from "../Button/Button";
// import Projectview from "./Projectview/Projectview";

import Navbar from "../Navbar/Navbar";
import Chat from "../Chat/Chat";
import "./Dashboard.css";
import { getUser, getTeams } from "../../redux/ducks/userReducer";
import DashboardView from "./DashboardView/DashboardView";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser().then(() => {
      console.log(this.props);
    });
  }
  render() {
    let id = this.props.user[0] ? this.props.user[0].id : "Loading";

    return (
      <div className="dashboard-container">
        <Grid container spacing={0}>
          <Grid item xs={3} className={"nav-container"}>
            <Navbar />
          </Grid>
          <Grid item xs={9}>
            <div className="top-bar">
              <h1 align={"center"}>Team Name</h1>
            </div>
            <Grid container spacing={0}>
              <Grid item xs={12} className={"view-container"}>
                {this.props.children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.userReducer
  };
}
export default connect(
  mapStateToProps,
  { getUser, getTeams }
)(Dashboard);
