import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { updateTask } from "../../../../redux/ducks/taskReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Start of  radio select options
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//End of radio select options

import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.task;

    this.original = this.props.task;
  }

  handleClick = status => {
    this.setState({ task_status: status }, () => {
      this.props.updateTask(this.props.task.id, {
        ...this.original,
        ...this.state
      });
    });
  };

  handleChange = status => {
    this.setState({ task_status: status });
  };

  handleClose = event => {
    console.log({ event });
    this.setState({ anchorEl: null, task_status: event.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.updateTask(this.props.task.id, {
      ...this.original,
      ...this.state
    });
  };

  render() {
    let { task_status, task_name, task_desc, due_date, id } = this.state;
    let brdColor = "white";
    if (task_status === "Pending") {
      brdColor = "red";
    } else if (task_status == "In Progress") {
      brdColor = "purple";
    } else if (task_status == "Delayed") {
      brdColor = "yellow";
    } else if (task_status == "Completed") {
      brdColor = "green";
    }
    let brdStyle = {
      borderColor: brdColor
    };
    return (
      <div className="task-container">
        <div className="task" style={brdStyle}>
          <div>
            <h2>{task_name}</h2>
            <p>{task_desc}</p>
            <p>Due-Date: {due_date.slice(0, -14)}</p>
            <p>Status: {task_status}</p>
            <form onSubmit={this.onSubmitHandler}>
              <div className={"statusLink"}>
                <a
                  value={"pending"}
                  onClick={() => this.handleClick("Pending")}
                >
                  pending
                </a>
              </div>
              <div className={"statusLink"}>
                <a
                  value={"In Progress"}
                  onClick={() => this.handleClick("In Progress")}
                >
                  In Progress
                </a>
              </div>
              <div className={"statusLink"}>
                <a
                  value={"Delayed"}
                  onClick={() => this.handleClick("Delayed")}
                >
                  Delayed
                </a>
              </div>
              <div className={"statusLink"}>
                <a
                  value={"Completed"}
                  onClick={() => this.handleClick("Completed")}
                >
                  Completed
                </a>
              </div>
            </form>
          </div>
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
  { updateTask }
)(Task);
