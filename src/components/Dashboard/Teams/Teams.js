import React, { Component } from "react";
import Team from "./Team/Team";
import { connect } from "react-redux";
import { getTeams, deleteTeam } from "../../../redux/ducks/userReducer";

class Teams extends Component {
  componentDidMount() {
    this.props.getTeams().then(() => {
      console.log(this.props);
    });
  }
  render() {
    let teamList = this.props.teams.map((team, i) => {
      return <Team key={i} team={team} />;
    });

    return (
      <div>
        <h1>Teams</h1>
        <hr />
        <div>{teamList}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    teams: state.userReducer.teams
  };
}
export default connect(
  mapStateToProps,
  { getTeams, deleteTeam }
)(Teams);
