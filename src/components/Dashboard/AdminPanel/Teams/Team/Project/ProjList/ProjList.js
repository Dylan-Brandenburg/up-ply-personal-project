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
      user: this.props.user
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.createNewTask(this.state);
  };
  onProjJoinHandler = e => {
    e.preventDefault();
    this.props.userJoinProject(this.props.project.id);
  };

  componentDidMount() {
    this.props.getProjectTasks(this.props.project.id).then(() => {
      console.log(this.props.project.id, this.props.project);
      this.setState({ tasks: this.props.projectTasks.projectTasks });
      this.props.getCurrentTeamid(this.props.project.team_id);
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
      <div className="ProjList-Container">
        {console.log(this.props)}
        <div>
          <p>{id}</p>
          <p>Name: {project_name}</p>
          <p> Desc: {project_desc}</p>
        </div>
        <div> Tasks:{projectTaskList}</div>
        <div>
          <p>Create a New Task</p>
          <div>
            {/* <div>
              Other project Members
            </div> */}
            <form onSubmit={this.onSubmitHandler}>
              <p>
                Task Name:{this.state.task_name}
                <input
                  placeholder="Task Name"
                  value={this.state.task_name}
                  onChange={e => this.setState({ task_name: e.target.value })}
                  type="text"
                />
              </p>
              <p>
                Task Desc:
                <input
                  placeholder="Task Desc"
                  value={this.state.task_desc}
                  onChange={e => this.setState({ task_desc: e.target.value })}
                  type="text"
                />
              </p>
              <p>
                Task Due Date:
                <input
                  placeholder="Task due date"
                  value={this.state.due_date}
                  onChange={e => this.setState({ due_date: e.target.value })}
                  type="date"
                />
              </p>
              <p>
                Assigned User:
                <input
                  placeholder="Task user"
                  value={this.state.user_id}
                  onChange={e => this.setState({ user_id: e.target.value })}
                  type="text"
                />
              </p>
              <button> submit</button>
            </form>
          </div>
        </div>
        <FontAwesomeIcon
          onClick={() => userJoinProject(this.props.project.id)}
          icon="plus"
        />
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
