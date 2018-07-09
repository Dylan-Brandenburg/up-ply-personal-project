import React from "react";
import { connect } from "react-redux";
import Button from "../../../Button/Button";
import { deleteTeam } from "../../../../redux/ducks/userReducer";

const Team = ({ team, deleteTeam }) => {
  const { team_name, id } = team;
  return (
    <div>
      <h4>Team Name:</h4>
      <h4>{team_name}</h4>
      <Button clicked={() => deleteTeam(id)}>
        <p>delete</p>
      </Button>
    </div>
  );
};

export default connect(
  null,
  { deleteTeam }
)(Team);
