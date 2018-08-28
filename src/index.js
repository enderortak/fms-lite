import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
// import { whyDidYouUpdate } from "why-did-you-update";

import store from "./service/StoreService";
import "./index.css";
import App from "./modules/App/App";
import SignIn from "./modules/SignIn/SignIn";
import FleetConfig from "./modules/FleetConfig/FleetConfig";
import registerServiceWorker from "./registerServiceWorker";
import "./shared/style/semantic-ui/semantic.css";
import "./shared/style/fonts/fonts.scss";
import "./shared/style/react-toastify.css";
import "./shared/style/fonts/grandnationalsuperital.css";

// whyDidYouUpdate(React, { groupByComponent: true, collapseComponentGroups: true });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/signin" component={SignIn} />
        <Route path="/" component={ToastContainer} />
        <Route exact path="/" component={FleetConfig} />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
