import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Header, Icon, Menu, Dropdown } from "semantic-ui-react";
import userPropType from "./../../../types/user";
import AuthService from "../../../service/AuthService";
import "./AccountMenu.scss";

export default class AccountMenu extends React.Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    user: userPropType.isRequired,
  }
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
    const { dispatch } = this.props;
    return (
      <Menu.Menu position="right" id="account-menu">
        <Dropdown item text={this.renderLoggedInUserDisplay()} icon="dropdown" >
          <Dropdown.Menu>
            <Dropdown.Item icon="settings" onClick={dispatch.showFleetConfigModal} text="Filo Yönetimi" />
            <Dropdown.Item icon="settings" text="Uygulama Ayarları" />
            <Dropdown.Divider />
            <Dropdown.Item icon="sign out" onClick={this.handleLogout} text="Çıkış" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  }
}
