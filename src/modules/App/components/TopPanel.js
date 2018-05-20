
import React from "react";
import { Menu, Search } from "semantic-ui-react";
import AccountMenu from "./AccountMenu";
import "./TopPanel.scss";
import logo from "./logo.png";


const TopPanel = props => (
  <Menu inverted id="top-panel" style={{ borderRadius: "0" }}>
    <img src={logo} alt="Site logosu" />
    <h1>Filo Takip Sistemi</h1>
    <Search
      category
      loading={isLoading}
      onResultSelect={this.handleResultSelect}
      onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
      results={results}
      value={value}
      {...this.props}
    />
    <AccountMenu user={props.user} history={props.history} />
  </Menu>
);

export default TopPanel;
