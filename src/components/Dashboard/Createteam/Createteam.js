import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createTeam } from "../../../redux/ducks/userReducer";
import Button from "../../Button/Button";

class Createteam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTeamName: ""
    };
  }
  onChangeHandler = e => {
    this.setState({ newTeamName: e.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.createTeam(this.state.newTeamName);
  };

  render() {
    return (
      <div>
        <h1>Create a team</h1>
        <div>
          <div>
            <h4>What would you like to call your team?</h4>
            <form onSubmit={this.onSubmitHandler}>
              <input
                placeholder="Team Name"
                value={this.state.newTeamName}
                onChange={e => this.setState({ newTeamName: e.target.value })}
                type="text"
              />
            </form>
            <Link to="/dashboard/teams">
              <Button>Submit</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.userReducer
  };
}
export default connect(
  mapStateToProps,
  { createTeam }
)(Createteam);
