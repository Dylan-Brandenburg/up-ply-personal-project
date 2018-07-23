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
        <div>
          <p>What would you like to call your team?</p>
          <form onSubmit={this.onSubmitHandler}>
            <input
              placeholder="Team Name"
              value={this.state.newTeamName}
              onChange={e => this.setState({ newTeamName: e.target.value })}
              type="text"
            />
            {/* <Link to="/dashboard/teams"> */}
            <Button onClick={e => this.onSubmitHandler(e)}>Submit</Button>
            {/* </Link> */}
          </form>
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
