
import React from "react";
import { Menu } from "semantic-ui-react";
import AccountMenu from "./AccountMenu";
import SearchComponent from "./Search";
import "./TopPanel.scss";
import logo from "./logo.png";


const TopPanel = props => (
  <Menu inverted id="top-panel" style={{ borderRadius: "0" }}>
    <img src={logo} alt="Site logosu" />
    <h1>Filo Takip Sistemi</h1>
    <SearchComponent />
    <AccountMenu user={props.user} history={props.history} />
  </Menu>
);

export default TopPanel;
