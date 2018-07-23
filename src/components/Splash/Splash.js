import React, { Component } from "react";
import logo from "../../logo.png";
import "./Splash.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export default class Splash extends Component {
  render() {
    return (
      <div>
        <div className="splash-header">
          <div className="splash-logo">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="splash-headerText">
            {" "}
            <h1> UP-Ply</h1>
          </div>
        </div>
        <div className="splash-content">
          {/* <div className="splash-background" /> */}
          <span />
          <div className="splash-login">
            <a href="http://localhost:3001/login">
              <Button className="login-button">Login</Button>
            </a>
            <div>
              <p>What is UP-Ply?</p>
              <p>UP-Ply is a team based project management system.</p>
            </div>
          </div>

          <span />

          <span />
        </div>
        <div className="splash-angled"> </div>
        <div className="spash-otherAngled" />
      </div>
    );
  }
}
