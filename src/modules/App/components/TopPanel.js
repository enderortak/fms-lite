
import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

import AccountMenu from "./AccountMenu";
import logo from "./logo.png";
import "./TopPanel.scss";


const TopPanel = props => (
  <Menu inverted id="top-panel" style={{ borderRadius: "0" }}>
    <img src={logo} alt="Site logosu" />
    <h1>Filo Takip Sistemi</h1>
    <AccountMenu user={props.user} history={props.history} />
  </Menu>
);

export default TopPanel;
