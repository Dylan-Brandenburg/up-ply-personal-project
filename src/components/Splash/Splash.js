import React, { Component } from "react";
import logo from "../../logo.png";
import "./Splash.css";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "../Button/Button";

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
          <div className="splash-login">
            <a href="http://localhost:3001/login">
              <button>Login</button>
            </a>
          </div>
        </div>
        <div className="splash-content">
          {/* <div className="splash-background" /> */}
          <span />
          <span />
          <span />
        </div>
        <div className="splash-angled"> </div>
        <div className="spash-otherAngled" />
      </div>
    );
  }
}
