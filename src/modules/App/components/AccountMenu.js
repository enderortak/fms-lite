import React from "react";
import { Header, Icon, Menu, Dropdown } from "semantic-ui-react";
import AuthService from "../../../service/AuthService";
import "./AccountMenu.scss";

export default class AccountMenu extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.Auth.logout();
    this.props.history.replace('/login');
  }
  renderLoggedInUserDisplay() {
    return (
      <Header as="h5" inverted id="account-name-display">
        <Icon name="user" />
        <Header.Content>
          {this.props.user.name}
        </Header.Content>
      </Header>
    );
  }
  render() {
    return (
      <Menu.Menu position="right" id="account-menu">
        <Dropdown item text={this.renderLoggedInUserDisplay()} icon="dropdown" >
          <Dropdown.Menu>
            <Dropdown.Header><Icon name="id card outline" />Hesap</Dropdown.Header>
            <Dropdown.Item icon="sign out" onClick={this.handleLogout} text="Çıkış" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  }
}
