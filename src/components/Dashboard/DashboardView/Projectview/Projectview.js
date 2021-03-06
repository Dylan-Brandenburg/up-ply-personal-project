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
    console.log(this.props.userProjects, typeof this.props.userProjects);
    // let projectList = [];
    // if (this.props.userProjects && this.props.userProjects) {
    let projectList =
      this.props.userProjects[0] &&
      this.props.userProjects.reverse().map((projects, id) => {
        if (id < 4) {
          return (
            <div className="projectview-cards" key={id}>
              <h3>{projects.project_name}</h3>
              <p>{projects.project_desc}</p>
              <p>{projects.team_id}</p>
            </div>
          );
        }
      });
    // }

    return (
      <div className="Projectview-body">
        <div>
          <h1>Recent projects</h1>
          <div className="projects__list">{projectList}</div>
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
