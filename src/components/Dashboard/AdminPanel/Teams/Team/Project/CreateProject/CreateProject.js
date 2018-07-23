import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  createNewProject,
  getCurentTeamid
} from "../../../../../../../redux/ducks/projectReducer";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: this.props.newProj.team_id,
      project_desc: this.props.newProj.project_desc,
      project_name: this.props.newProj.project_name
    };
  }
  componentDidMount() {
    const { currentTeamid } = this.props;
    console.log({ currentTeamid });
    this.setState({ team_id: currentTeamid });
  }
  onChangeHandler = e => {
    this.setState({ newTeamName: e.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.createNewProject(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Create a new Project</h1>
        <div>
          <div>
            <h4>What would you like to call your project</h4>
            <form onSubmit={this.onSubmitHandler}>
              <input
                placeholder="Project Name"
                value={this.state.project_name}
                onChange={e => this.setState({ project_name: e.target.value })}
                type="text"
              />
              <input
                placeholder="Proj Desc"
                value={this.state.project_desc}
                onChange={e => this.setState({ project_desc: e.target.value })}
                type="text"
              />

              <button>Submit</button>
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
