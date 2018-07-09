import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../../../redux/ducks/taskReducer";

import "./Taskview.css";
class Tasksview extends Component {
  componentDidMount() {
    this.props.getTasks().then(() => {});
  }
  render() {
    let taskList = [];

    taskList = this.props.tasks.reverse().map((task, id) => {
      if (id < 4) {
        return (
          <div key={id}>
            <p>
              {id}
              {task.task_name}
              {task.task_desc}
              {task.status}
            </p>
          </div>
        );
      }
    });

    return (
      <div className="Taskview-body">
        <div>
          <h1>Recent tasks </h1>
          <div>{taskList}</div>
        </div>
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
)(Tasksview);
