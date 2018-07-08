
import React from "react";
import propTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { Menu } from "semantic-ui-react";
import userPropType from "./../../../types/user";
import AccountMenu from "./AccountMenu";
import Search from "./../../Search/Search";
import "./TopPanel.scss";
import logo from "./logo.png";

const TopPanel = ({
  state, dispatch, user, history,
}) => (
  <Menu inverted id="top-panel">
    <img src={logo} alt="Site logosu" />
    <h1>Filo Takip Sistemi</h1>
    <Search dispatch={dispatch} state={state} />
    <AccountMenu {... { user, history, dispatch }} />
  </Menu>
);
TopPanel.propTypes = {
  state: propTypes.object.isRequired,
  dispatch: propTypes.object.isRequired,
  history: ReactRouterPropTypes.history.isRequired, // eslint-disable-line
  user: userPropType.isRequired, // eslint-disable-line
};
export default TopPanel;
