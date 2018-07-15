import React from "react";
import { connect } from "react-redux";
import { deleteTeam } from "../../../../../redux/ducks/userReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Team.css";

const Team = ({ team, deleteTeam }) => {
  const { team_name, id } = team;
  return (
    <div className="team">
      <div className="trash">
        <FontAwesomeIcon onClick={() => deleteTeam(id)} icon="trash-alt" />
      </div>
      <p>Team {team_name}</p>
    </div>
  );
};

export default connect(
  null,
  { deleteTeam }
)(Team);
