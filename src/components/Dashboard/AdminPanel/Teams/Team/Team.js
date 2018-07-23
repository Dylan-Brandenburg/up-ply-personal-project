import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTeam } from "../../../../../redux/ducks/userReducer";
import { userJoinTeam } from "../../../../../redux/ducks/projectReducer";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Team.css";

const Team = ({ team, deleteTeam }) => {
  const { team_name, id } = team;
  console.log(team);
  return (
    <div className="team">
      <Tooltip title="Delete">
        <div className="trash">
          <FontAwesomeIcon onClick={() => deleteTeam(id)} icon="trash-alt" />
        </div>
      </Tooltip>
      <Link to={`/dashboard/AdminPanel/teams/${id}`}>
        <p>Team {team_name}</p>
      </Link>
      <Tooltip title="Join Team">
        <div className="join-team">
          <Button onClick={() => userJoinTeam(id)}>
            <FontAwesomeIcon icon="plus" />
          </Button>
        </div>
      </Tooltip>
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
