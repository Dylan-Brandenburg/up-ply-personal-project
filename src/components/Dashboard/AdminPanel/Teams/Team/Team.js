import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTeam } from "../../../../../redux/ducks/userReducer";
import { userJoinTeam } from "../../../../../redux/ducks/projectReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Team.css";

const Team = ({ team, deleteTeam }) => {
  const { team_name, id } = team;
  console.log(team);
  return (
    <div className="team">
      <div className="trash">
        <FontAwesomeIcon onClick={() => deleteTeam(id)} icon="trash-alt" />
      </div>
      <Link to={`/dashboard/AdminPanel/teams/${id}`}>
        <p>Team {team_name}</p>
      </Link>
      <p>
        {" "}
        Join Team{" "}
        <FontAwesomeIcon onClick={() => userJoinTeam(id)} icon="plus" />
      </p>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}
export default connect(
  mapStateToProps,
  { deleteTeam, userJoinTeam }
)(Team);
