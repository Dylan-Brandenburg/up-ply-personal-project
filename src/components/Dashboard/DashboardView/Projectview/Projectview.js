import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProjects } from "../../../../redux/ducks/projectReducer";
import "./Projectview.css";

class Projectview extends Component {
  componentDidMount() {
    this.props.getUserProjects().then(() => {
      console.log(this.props.userProjects);
    });
  }
  render() {
    let projectList = this.props.userProjects.reverse().map((projects, id) => {
      if (id < 4) {
        return (
          <div key={id}>
            <p>
              {projects.project_name}
              {projects.project_desc}
              {projects.team_id}
            </p>
          </div>
        );
      }
    });

    return (
      <div className="Projectview-body">
        <div>
          <h1>Recent projects</h1>
          <div>{projectList}</div>
        </div>
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
)(Projectview);
