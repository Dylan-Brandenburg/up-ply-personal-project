import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProjects } from "../../../redux/ducks/projectReducer";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getUserProjects().then(() => {
      console.log(this.props.userProjects);
    });
  }
  render() {
    let projectList = this.props.userProjects.map((projects, i) => {
      return (
        <div key={i}>
          <p>
            {projects.project_name}
            {projects.project_desc}
            {projects.team_id}
          </p>
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
    ...state.projectReducer
  };
}
export default connect(
  mapStateToProps,
  { getUserProjects }
)(Projects);
