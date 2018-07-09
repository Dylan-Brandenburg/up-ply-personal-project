import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../../redux/ducks/taskReducer";
import Tasksview from "../DashboardView/Taskview/Taskview";

class Tasks extends Component {
  componentDidMount() {
    this.props.getTasks().then(() => {
      console.log(this.props);
    });
  }

  render() {
    let taskList = this.props.tasks.map((task, i) => {
      return (
        <div key={i}>
          <p>
            {task.task_name}
            {task.task_desc}
            {task.status}
          </p>
        </div>
      );
    });

    return (
      <div>
        {" "}
        <h1>Tasks</h1>
        <div>{taskList}</div>
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
