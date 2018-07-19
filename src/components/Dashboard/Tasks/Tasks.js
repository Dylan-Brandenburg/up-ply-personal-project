import React, { Component } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../../redux/ducks/taskReducer";
import Task from "./Task/Task";
import Tasksview from "../DashboardView/Taskview/Taskview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
