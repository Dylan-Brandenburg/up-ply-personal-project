import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../../redux/ducks/userReducer";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user[0].first_name,
      last_name: this.props.user[0].last_name,
      email: this.props.user[0].email,
      role: this.props.user[0].role
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.updateUser(this.state);
  };
  render() {
    {
      console.log(this.props.user);
    }
    let { last_name, first_name, email, role } = this.state;

    return (
      <div>
        <h1>settings</h1>
        <div>
          <ul>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                First Name: {first_name}{" "}
                <input
                  placeholder="First Name"
                  value={this.state.first_name}
                  onChange={e => this.setState({ first_name: e.target.value })}
                  type="text"
                />
              </li>
            </form>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                Last Name: {last_name}
                <input
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChange={e => this.setState({ last_name: e.target.value })}
                  type="text"
                />
              </li>
            </form>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                email: {email}{" "}
                <input
                  placeholder="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  type="text"
                />
              </li>
            </form>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                role: {role}{" "}
                <input
                  placeholder="lastName"
                  value={this.state.role}
                  onChange={e => this.setState({ role: e.target.value })}
                  type="text"
                />
              </li>
            </form>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  { updateUser }
)(Settings);
