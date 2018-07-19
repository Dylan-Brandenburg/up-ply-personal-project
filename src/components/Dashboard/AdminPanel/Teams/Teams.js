import React, { Component } from "react";
import { Link } from "react-router-dom";
import Team from "./Team/Team";
import { connect } from "react-redux";
import { getTeams, deleteTeam } from "../../../../redux/ducks/userReducer";
import "./Teams.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="Teamcontainer">
          <Link to="/dashboard/createteam">
            <FontAwesomeIcon icon="plus" />
          </Link>

          <div className="Teamlist">{teamList}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    teams: state.userReducer.teams,
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  { getTeams, deleteTeam }
)(Teams);
