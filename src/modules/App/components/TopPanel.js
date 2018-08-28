
import React from "react";
import propTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { Menu } from "semantic-ui-react";
import AccountMenu from "./AccountMenu";
import Search from "./../../Search/Search";
import "./TopPanel.scss";
import logo from "./logo.png";
import LocalizationService from "../../../service/LocalizationService";

const loc = new LocalizationService("topPanel");
const TopPanel = ({ onFleetConfigClick, history }) => (
  <Menu inverted id="top-panel">
    <div className="logo">
      <img src={logo} alt="Site logosu" />
    </div>
    <div className="title">
      <h1>{loc.string("title")}</h1>
    </div>
    <Search />
    <div style={{ fontFamily: "Grand National Super-Italic", visibility: "hidden" }}>asd</div>
    <AccountMenu {... { history, onFleetConfigClick }} />
  </Menu>
);
TopPanel.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  onFleetConfigClick: propTypes.func.isRequired,
};
export default TopPanel;
