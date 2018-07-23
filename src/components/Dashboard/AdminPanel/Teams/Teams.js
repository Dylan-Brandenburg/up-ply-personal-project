import React, { Component } from "react";
import { Link } from "react-router-dom";
import Team from "./Team/Team";
import { connect } from "react-redux";
import {
  getTeams,
  deleteTeam,
  createTeam
} from "../../../../redux/ducks/userReducer";
import "./Teams.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@material-ui/core/Tooltip";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

class Teams extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      newTeamName: ""
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  onChangeHandler = e => {
    this.setState({ newTeamName: e.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.createTeam(this.state.newTeamName);
    this.setState({ open: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
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
      <div className="teams-container">
        <h1>Teams</h1>
        <div className="Teamcontainer">
          <Tooltip title="Create A Team">
            <div className="create-team">
              <Button onClick={this.handleClickOpen}>
                <FontAwesomeIcon icon="plus" />
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="create-team-dialog"
              >
                <DialogContent>
                  <DialogTitle id="alert-dialog-title">
                    {"Create a new team"}
                  </DialogTitle>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Team Name"
                    type="text"
                    value={this.state.newTeamName}
                    onChange={e =>
                      this.setState({ newTeamName: e.target.value })
                    }
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={e => this.onSubmitHandler(e)}
                    color="primary"
                  >
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Tooltip>
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
  { getTeams, deleteTeam, createTeam }
)(Teams);
