import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { updateTask, getTasks } from "../../../../redux/ducks/taskReducer";

import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.task;

    this.original = this.props.task;
  }

  componentDidMount() {
    console.log(this.state);
  }
  handleClick = status => {
    const { original, state } = this;
    console.log({ original, state });

    this.setState({ task_status: status }, () => {
      this.props
        .updateTask(this.props.task.id, {
          ...this.original,
          ...this.state
        })
        .then(() => this.props.getTasks());
    });
  };

  handleChange = status => {
    this.setState({ task_status: status });
  };

  handleClose = event => {
    console.log({ event });
    this.setState({ anchorEl: null, task_status: event.target.value });
  };

  render() {
    let { task_status, task_name, task_desc, due_date, id } = this.state;
    let brdColor = "white";
    if (task_status === "Pending") {
      brdColor = "#ff3300";
    } else if (task_status == "In Progress") {
      brdColor = "#3399ff";
    } else if (task_status == "Delayed") {
      brdColor = "#ffff66";
    } else if (task_status == "Completed") {
      brdColor = "#66ff66";
    }
    let brdStyle = {
      borderColor: brdColor
    };
    return (
      <div className="task-container">
        <div className="task" style={brdStyle}>
          <h2>{task_name}</h2>
          <p>{task_desc}</p>
          <p>Due-Date: {due_date.slice(0, -14)}</p>
          <p>Status: {task_status}</p>
          {/* <form onSubmit={this.onSubmitHandler}> */}
          <div className={"task-status"}>
            <p>Change Status:</p>
          </div>
          <div className="statusLinks">
            <div className="statusLink">
              <Button
                className="statusLink__link"
                value={"pending"}
                onClick={() => this.handleClick("Pending")}
              >
                Pending
              </Button>
            </div>
            <div className={"statusLink"}>
              <Button
                className="statusLink__link"
                value={"In Progress"}
                onClick={() => this.handleClick("In Progress")}
              >
                In Progress
              </Button>
            </div>
            <div className={"statusLink"}>
              <Button
                className="statusLink__link"
                value={"Delayed"}
                onClick={() => this.handleClick("Delayed")}
              >
                Delayed
              </Button>
            </div>
            <div className={"statusLink"}>
              <Button
                className="statusLink__link"
                value={"Completed"}
                onClick={() => this.handleClick("Completed")}
              >
                Completed
              </Button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.taskReducer.tasks
  };
}
export default connect(
  mapStateToProps,
  { updateTask, getTasks }
)(Task);
