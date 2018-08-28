import React from "react";
import propTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { Header, Icon, Menu, Dropdown } from "semantic-ui-react";
import AuthService from "../../../service/AuthService";
import "./AccountMenu.scss";
import LocalizationService from "../../../service/LocalizationService";
import withModal from "./../../../shared/components/ModalHoc";
import AppSettings from "./../../AppSettings/AppSettings";

const loc = new LocalizationService("accountMenu");
export default class AccountMenu extends React.Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    onFleetConfigClick: propTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.Auth.logout();
    this.props.history.replace('/signin');
  }
  renderLoggedInUserDisplay() {
    return (
      <div className="text">
        <Header as="h5" inverted id="account-name-display">
          <Icon name="user" />
          <Header.Content>
            {this.Auth.getProfile().name}
          </Header.Content>
        </Header>
      </div>
    );
  }
  render() {
    const { onFleetConfigClick } = this.props;
    const DropdownItemWithModal = withModal(Dropdown.Item);
    return (
      <Menu.Menu position="right" id="account-menu">
        <Dropdown item trigger={this.renderLoggedInUserDisplay()} icon="dropdown" >
          <Dropdown.Menu>
            <Dropdown.Item icon="settings" onClick={onFleetConfigClick} text={loc.string("fleetManagement")} />
            <DropdownItemWithModal icon="settings" text={loc.string("appSettings")} modal={AppSettings} />
            <Dropdown.Divider />
            <Dropdown.Item icon="sign out" onClick={this.handleLogout} text={loc.string("signOut")} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  }
}
