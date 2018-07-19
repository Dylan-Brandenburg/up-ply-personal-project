import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTeamProjects,
  createNewProject
} from "../../../../../../redux/ducks/projectReducer";
import { createNewTask } from "../../../../../../redux/ducks/taskReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjList from "./ProjList/ProjList";
import "./Project.css";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // task_name: "",
      // task_desc: "",
      // task_status: null,
      // finished: null,
      // user_id: 0,
      // assigned_proj_id: 1,
      // due_date: ""
      loading: true
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.createNewTask(this.state);
  };
  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.getTeamProjects(this.props.match.params.id);
    this.setState({ loading: false });
  }
  render() {
    let projectList = !this.state.loading
      ? this.props.teamProjects.map((project, i) => {
          return <ProjList key={i} project={project} />;
        })
      : "loading...";

    return (
      <div>
        <div>
          <h1>All Projects</h1>
          <div>
            <Link to={"/dashboard/AdminPanel/createproject"}>
              <p>
                Create new Project<FontAwesomeIcon icon="plus" />
              </p>
            </Link>
          </div>
        </div>
        <div className="projlist">{projectList}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.projectReducer,
    task: state.taskReducer
  };
}
export default connect(
  mapStateToProps,
  { getTeamProjects, createNewTask, createNewProject }
)(Project);
