
import React from "react";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import AccountMenu from "./AccountMenu";
import Search from "./../../Search/Search";
import "./TopPanel.scss";
import logo from "./logo.png";
import MapService from "../../../service/MapService";


const TopPanel = ({
  state, dispatch, user, history,
}) => (
  <Menu inverted id="top-panel" style={{ borderRadius: "0" }}>
    <img src={logo} alt="Site logosu" />
    <h1>Filo Takip Sistemi</h1>
    <Search dispatch={dispatch} state={state} />
    <AccountMenu user={user} history={history} />
  </Menu>
);

export default TopPanel;
