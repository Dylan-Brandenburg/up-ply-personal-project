import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { getUser } from "../../redux/ducks/userReducer";
import Button from "@material-ui/core/Button";

import "./Chat.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      messages: []
    };
    // Sockets
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
      const messagesWithNewMessage = [...this.state.messages, data];
      const messagesWithIds = messagesWithNewMessage.map((message, index) => ({
        ...message,
        index
      }));
      this.setState({ messages: messagesWithIds });
      console.log(this.state.messages);
    };
    // socket discconnect
    this.socket.on("disconnected", function(ChatUser) {
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
        author: this.props.user[0] ? this.props.user[0].first_name : "Anon",
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }
  //end of sockets
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentDidMount() {
    this.props.getUser().then(() => {
      this.socket.emit("USER_CONNECTED", {
        name: this.props.user[0] ? this.props.user[0].first_name : "First"
      });
    });
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="chat__container">
        <div className="chat__title">
          <h4>Team Chat</h4>
        </div>

        <div className="chat__messages">
          {this.state.messages.map(message => {
            return (
              <div key={message.index}>
                {message.author}: {message.message}
              </div>
            );
          })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <div className="chat__newMessage">
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid grey",
              borderRadius: "10px"
            }}
            type="text"
            placeholder="Message"
            className="chat__newMessage__input"
            value={this.state.message}
            onChange={ev => this.setState({ message: ev.target.value })}
          />
        </div>
        <div className="chat__footer">
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
