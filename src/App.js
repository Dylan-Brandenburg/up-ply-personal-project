import React, { Component } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { Tab } from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faFolderOpen,
  faClipboardList,
  faCog,
  faTrash,
  faTrashAlt,
  faPlus,
  faToolbox,
  faUserCog
} from "@fortawesome/free-solid-svg-icons";

import store from "./redux/store";
import routes from "./routes";
library.add(
  faTachometerAlt,
  faUsers,
  faFolderOpen,
  faClipboardList,
  faCog,
  faTrashAlt,
  faPlus,
  faToolbox,
  faUsers,
  faUserCog
);
class App extends Component {
  // const { REACT_APP_CLIENT_HOST } = process.env;
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <div>{routes}</div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
