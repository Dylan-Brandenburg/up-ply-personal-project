import React, { Component } from "react";
import { connect } from "react-redux";
import StayScrolled from "react-stay-scrolled";
import io from "socket.io-client";
import { getUser } from "../../redux/ducks/userReducer";
import Button from "@material-ui/core/Button";

import "./Chat.css";
import axios from "axios";

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

    this.socket.on("THEUSER_CONNECTED", function(data) {
      const newUser = {
        author: data.name,
        message: "connected"
      };
      addMessage(newUser);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
    // socket discconnect
    this.socket.on("disconnected", function(ChatUser) {
      console.log(ChatUser);
      const newUser = {
        author: ChatUser,
        message: "Left"
      };
      addMessage(newUser);
    });
    //end of disconnect

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        // author: this.state.username,
        author: this.props.user[0] ? this.props.user[0].first_name : "Anon",
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.props.getUser().then(() => {
      this.socket.emit("USER_CONNECTED", {
        name: this.props.user[0] ? this.props.user[0].first_name : "First"
      });
    });
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    console.log(this.props.user);
  }
  comp;
  render() {
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
          <textarea
            type="text"
            placeholder="Message"
            className="form-control"
            value={this.state.message}
            onChange={ev => this.setState({ message: ev.target.value })}
          />
          <br />
          <Button
            onClick={this.sendMessage}
            className="btn btn-primary form-control"
          >
            Send
          </Button>
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
  { getUser }
)(Chat);
