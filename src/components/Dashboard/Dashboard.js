import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import Navbar from "../Navbar/Navbar";

import "./Dashboard.css";
import { getUser, getTeams } from "../../redux/ducks/userReducer";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser().then(() => {
      console.log(this.props);
    });
  }
  render() {
    // let id = this.props.user[0] ? this.props.user[0].id : "Loading";

    return (
      <div className="dashboard-container">
        <Grid container spacing={0}>
          <Grid item xs={3} className={"nav-container"}>
            <Navbar />
          </Grid>
          <Grid item xs={9} className={"view-container"}>
            {this.props.children}
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
