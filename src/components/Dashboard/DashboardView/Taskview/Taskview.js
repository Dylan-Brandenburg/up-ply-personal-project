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
    console.log(this.props);

    taskList =
      this.props.tasks[0] &&
      this.props.tasks.reverse().map((task, id) => {
        if (id < 4) {
          return (
            <div className="taskview-cards" key={id}>
              {/* <p>{id}</p> */}
              <h3>{task.task_name}</h3>
              <p>{task.task_desc}</p>
              <p>{task.task_status}</p>
            </div>
          );
        }
      });

    return (
      <div className="taskview-body">
        <h1>Recent tasks </h1>
        <div className="tasks_list">{taskList}</div>
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
