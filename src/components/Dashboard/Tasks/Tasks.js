import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../../redux/ducks/taskReducer";
import Task from "./Task/Task";

import "./Tasks.css";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getTasks().then(() => {
      console.log(this.props);
    });
  }

  render() {
    let taskList = this.props.tasks.map((task, i) => {
      return <Task key={i} task={task} />;
    });
    return (
      <div>
        <h1>My Tasks</h1>
        <div className="tasklist-container">{taskList}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.taskReducer
  };
}

export default connect(
  mapStateToProps,
  { getTasks }
)(Tasks);
