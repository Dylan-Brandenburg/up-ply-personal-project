import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  createNewProject,
  getCurentTeamid
} from "../../../../../../../redux/ducks/projectReducer";
import Button from "../../../../../../Button/Button";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProj: this.props.newProj
      // ...this.props.newProj
    };
  }
  onChangeHandler = e => {
    this.setState({ newTeamName: e.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const newTeamIdProj = {
      ...this.state.newProj,
      team_id: this.props.teamProjects[0].team_id
    };
    this.setState({ newProj: newTeamIdProj }, () => {
      this.props.createNewProject(this.state.newProj);
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Create a new Project</h1>
        <div>
          <div>
            <h4>What would you like to call your project</h4>
            <form onSubmit={this.onSubmitHandler}>
              <input
                placeholder="Project Name"
                value={this.state.newProjproject_name}
                onChange={e => this.setState({ project_name: e.target.value })}
                type="text"
              />
              <input
                placeholder="Proj Desc"
                value={this.state.newProj.project_desc}
                onChange={e => this.setState({ project_desc: e.target.value })}
                type="text"
              />
              <Link to="/dashboard/adminPanel/teams">
                <Button>Submit</Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    newProj: state.projectReducer.newProj,
    currentTeamid: state.projectReducer.currentTeamid
  };
}
export default connect(
  mapStateToProps,
  { createNewProject }
)(CreateProject);
