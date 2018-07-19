import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProjects } from "../../../redux/ducks/projectReducer";
import { getTasks } from "../../../redux/ducks/taskReducer";
import "./Projects.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getUserProjects().then(() => {
      console.log(this.props);
    });
  }
  render() {
    let { task_name, assigned_proj_id } = this.props.tasks;
    console.log(this.props.tasks);
    let projectList = this.props.userProjects.map((project, i) => {
      console.log({ project });
      return (
        <div key={i} className={"project-container"}>
          <p>
            {project.id}
            {project.project_name}
          </p>
          <p> {project.project_desc}</p>
          <p>Tasks</p>
          <hr />
          {this.props.tasks
            .filter(task => task.assigned_proj_id === project.id)
            .map(task => <p key={task.id}>{task.task_name}</p>)}
        </div>
      );
    });

    return (
      <div>
        <div>
          <h1>My Projects</h1>
        </div>
        <div>{projectList}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.projectReducer,
    ...state.taskReducer
  };
}
export default connect(
  mapStateToProps,
  { getTasks, getUserProjects }
)(Projects);
