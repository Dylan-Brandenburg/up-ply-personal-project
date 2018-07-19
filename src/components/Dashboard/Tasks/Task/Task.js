import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { updateTask } from "../../../../redux/ducks/taskReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.task;

    this.original = this.props.task;
  }
  // handleClick = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };
  handleClick = status => {
    this.setState({ task_status: status }, () => {
      this.props.updateTask(this.props.task.id, {
        ...this.original,
        ...this.state
      });
    });
  };

  handleClose = event => {
    console.log({ event });
    this.setState({ anchorEl: null, task_status: event.target.value });
    console.log(this.state.task_status);
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.updateTask(this.state.task_status);
    console.log(this.state.task_status);
  };

  render() {
    const { anchorEl } = this.state;
    let { task_status, task_name, task_desc, due_date, id } = this.state;
    let brdColor = "white";
    if (task_status === "Pending") {
      brdColor = "red";
    } else if (task_status == "In Progress") {
      brdColor = "purple";
    } else if (task_status == "Delayed") {
      brdColor = "yello2";
    } else if (task_status == "Completed") {
      brdColor = "green";
    }
    let brdStyle = {
      borderColor: brdColor
    };
    return (
      <div className="task" style={brdStyle}>
        <div>
          <p>Status: {task_status}</p>
          {/* <div> */}
          {/* <form onSubmit={this.submitData}>
            <Button
              aria-owns={anchorEl ? "fade-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Status: {task_status}
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem value={"Pending"} onClick={this.handleClose}>
                Pending
              </MenuItem>

              <MenuItem value={200} onClick={this.handleClose}>
                In Progress
              </MenuItem>
              <MenuItem value={300} onClick={this.handleClose}>
                Delayed
              </MenuItem>
              <MenuItem value={400} onClick={this.handleClose}>
                Completed
              </MenuItem>
            </Menu>
          </form>
        </div> */}
          <form onSubmit={this.onSubmitHandler}>
            <div className={"statusLink"}>
              <a value={"pending"} onClick={() => this.handleClick("Pending")}>
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
              <a value={"Delayed"} onClick={() => this.handleClick("Delayed")}>
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

          <p>Task {task_name}</p>
          <p>Desc:{task_desc}</p>
          <p>Due-Date: {due_date}</p>
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
