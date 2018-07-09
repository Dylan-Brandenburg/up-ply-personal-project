import React, { Component } from "react";
import "./Splash.css";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "../Button/Button";

import ExitToApp from "@material-ui/icons/ExitToApp";

export default class Splash extends Component {
  render() {
    return (
      <div>
        <div className="login-container">
          <h1>UP PLY DUDE!!!</h1>
          <a href="http://localhost:3001/login">
            <Button>Login</Button>
          </a>
          <a href="http://localhost:3001/logout">
            <Button>Logout</Button>
          </a>
        </div>
      </div>
    );
  }
}
