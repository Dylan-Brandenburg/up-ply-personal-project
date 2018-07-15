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
        <Grid container spacing={0}>
          <Grid item xs={3} className={"logo"}>
            <p>logo</p>
          </Grid>
          <Grid item xs={6} className={"title"}>
            <div>
              <h1>Up-Ply</h1>{" "}
            </div>
          </Grid>
          <Grid item xs={3} className={"loginArea"}>
            <div>
              <a href="http://localhost:3001/login">
                <Button>Login</Button>
              </a>
              <a href="http://localhost:3001/logout">
                <Button>Logout</Button>
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
