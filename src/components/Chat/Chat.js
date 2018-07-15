import React, { Component } from "react";
import { connect } from "react-redux";
import StayScrolled from "react-stay-scrolled";
import io from "socket.io-client";

import "./Chat.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    this.socket = io("localhost:3001");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        // author: this.state.username,
        author: this.props.user[0] ? this.props.user[0].first_name : "First",
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    console.log(this.props.user);
  }

  render() {
    let first_name = this.props.user[0]
      ? this.props.user[0].first_name
      : "First";

    return (
      <div>
        <div className="chatTitle">Team Chat</div>
        <div className="chat-container">
          <hr />
          <div className="messages">
            {this.state.messages.map(message => {
              return (
                <div>
                  {message.author}: {message.message}
                  {console.log(message.message)}
                </div>
              );
            })}
          </div>
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <div className="footer">
          {/* <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={ev => this.setState({ username: ev.target.value })}
            className="form-control"
          />
          <br /> */}
          <input
            type="text"
            placeholder="Message"
            className="form-control"
            value={this.state.message}
            onChange={ev => this.setState({ message: ev.target.value })}
          />
          <br />
          <button
            onClick={this.sendMessage}
            className="btn btn-primary form-control"
          >
            Send
          </button>
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
  {}
)(Chat);
