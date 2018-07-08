import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import store from "./service/StoreService";
import "./index.css";
import App from "./modules/App/App";
import Login from "./modules/Login/Login";
import FleetConfig from "./modules/FleetConfig/FleetConfig";
import registerServiceWorker from "./registerServiceWorker";
import "./shared/style/semantic-ui/semantic.css";
import "./shared/style/fonts/fonts.scss";
import "./shared/style/react-toastify.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route path="/" component={ToastContainer} />
        <Route exact path="/" component={FleetConfig} />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
