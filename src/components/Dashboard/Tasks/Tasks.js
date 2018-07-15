import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../../redux/ducks/taskReducer";
import Tasksview from "../DashboardView/Taskview/Taskview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Tasks.css";

class Tasks extends Component {
  componentDidMount() {
    this.props.getTasks().then(() => {
      console.log(this.props);
    });
  }

  render() {
    let taskList = this.props.tasks.map((task, i) => {
      return (
        <div key={i} className="task">
          <div className="trash">
            {" "}
            <FontAwesomeIcon icon="trash-alt" />
          </div>
          <div>
            <p>task:{task.task_name}</p>
            <p>Desc:{task.task_desc}</p>
            <p>Status:{task.status}</p>
          </div>
        </div>
      );
    });

    return (
      <div>
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
