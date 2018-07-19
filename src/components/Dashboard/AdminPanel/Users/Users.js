import React, { Component } from "react";
import { connect } from "react-redux";
import userReducer, {
  getEveryone,
  getTeams
} from "../../../../redux/ducks/userReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tasksReducer from "../../../../redux/ducks/taskReducer";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getEveryone();
    this.props.getTeams().then(() => {
      console.log(this.props);
    });
  }
  render() {
    let usersList = this.props.everyone.map((user, i) => {
      return (
        <div key={user.id}>
          <p>User id:{user.id}</p>
          <p>{user.first_name}</p>
          <p>{user.last_name}</p>
          <p>{user.role}</p>
          <p>{user.email}</p>
          <p>{user.admin}</p>
          <hr />
        </div>
      );
    });

    return (
      <div>
        <h1>Users</h1>
        <div>{usersList}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    everyone: state.userReducer.everyone,
    teams: state.userReducer.teams
  };
}
export default connect(
  mapStateToProps,
  { getEveryone, getTeams }
)(Users);
