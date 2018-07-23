import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTeamProjects,
  getProjectTasks,
  userJoinProject,
  getCurrentTeamid
} from "../../../../../../../redux/ducks/projectReducer";
import { createNewTask } from "../../../../../../../redux/ducks/taskReducer";
import {} from "../../../../../../../redux/ducks/userReducer";
import CreateProject from "../CreateProject/CreateProject";

//form Dialog
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";

//end form dialog

import "./ProjList.css";

class ProjList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_name: "",
      task_desc: "",
      task_status: null,
      finished: null,
      user_id: 0,
      assigned_proj_id: this.props.project.id,
      due_date: "",
      tasks: [],
      user: this.props.user,
      open: false
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.createNewTask(this.state);
    this.setState({ open: false });
  };
  onProjJoinHandler = e => {
    e.preventDefault();
    this.props.userJoinProject(this.props.project.id);
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getProjectTasks(this.props.project.id).then(() => {
      console.log(this.props.project.id, this.props.project);
      this.setState({ tasks: this.props.projectTasks.projectTasks });
    });
  }

  render() {
    let { id, project_name, project_desc } = this.props.project;
    let projectTaskList = this.state.tasks.map((projectTasks, i) => {
      return (
        <div key={i}>
          <p>
            Task: {projectTasks.task_name} Status:{projectTasks.task_status}
            <br />
            Assigned Member: {projectTasks.user_id}
          </p>
        </div>
      );
    });

    return (
      <div className="projlist-content">
        <div className="projlist-container">
          <p>{id}</p>
          <p>Name: {project_name}</p>
          <p> Desc: {project_desc}</p>
        </div>
        <div> Tasks:{projectTaskList}</div>
        <div>
          <div>
            <div>
              <Button onClick={this.handleClickOpen}>Create a new task</Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Create a new task
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>Ender Task information</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task Name"
                    type="text"
                    value={this.state.task_name}
                    onChange={e => this.setState({ task_name: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Task Description"
                    type="text"
                    value={this.state.task_desc}
                    onChange={e => this.setState({ task_desc: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label=""
                    type="date"
                    value={this.state.due_date}
                    onChange={e => this.setState({ due_date: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="User"
                    type="Number"
                    value={this.state.user_id}
                    onChange={e => this.setState({ user_id: e.target.value })}
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
          </div>
          <Tooltip title="Join This Project">
            <FontAwesomeIcon
              onClick={() => userJoinProject(this.props.project.id)}
              icon="plus"
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentTeamid: state.projectReducer.currentTeamid,
    task: state.taskReducer,
    projectTasks: state.projectReducer,
    user: state.userReducer
  };
}
export default connect(
  mapStateToProps,
  { createNewTask, getProjectTasks, userJoinProject, getCurrentTeamid }
)(ProjList);
