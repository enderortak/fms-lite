import React from "react";
import propTypes from "prop-types";
import { Tab, Icon, Menu } from "semantic-ui-react";
import FMSIcon from "./../../../shared/components/FMSIcon";
import ComingSoon from "./../../../shared/components/ComingSoon";
import "./SidePanel.scss";
import VehicleSidePanelDisplay from "./../../Vehicle/VehicleSidePanelDisplay";

export default class SidePanel extends React.Component {
  static showSettings(event) {
    event.preventDefault();
  }
  static propTypes = {
    state: propTypes.object.isRequired,
    dispatch: propTypes.object.isRequired,
  }
  panes() {
    const { state } = this.props;
    return [
      [
        <Menu.Item key="Tab 1"><i className="ui icon ui-icon-truck-front" /> Araç</Menu.Item>,
        <Tab.Pane
          as={VehicleSidePanelDisplay}
          vehicle={state.map.vehicles.filter(v => v.vin === state.map.selectedVehicle)[0]}
        />,
      ],
      [
        <Menu.Item key="Tab 2"><Icon name="object group" />Gruplar</Menu.Item>,
        <Tab.Pane>
          <ComingSoon />
        </Tab.Pane>,
      ],
      [
        <Menu.Item key="Tab 3"><FMSIcon name="fleet" />Filo</Menu.Item>,
        <Tab.Pane><ComingSoon /></Tab.Pane>,
      ],
      [
        <Menu.Item key="Tab 4"><Icon name="compass" />Gösterge</Menu.Item>,
        <Tab.Pane><ComingSoon /><Icon name="chevron right" /></Tab.Pane>,
      ],
    ];
  }
  render() {
    const { state, dispatch } = this.props;
    return (
      <div id="side-panel" className={state.app.sidePanel.visible ? "open" : ""}>
        <div
          className="toggle-panel"
          onClick={() => dispatch.setSidePanelVisibility(!state.app.sidePanel.visible)}
        >
          <Icon name={`chevron ${state.app.sidePanel.visible ? "right" : "left"}`} />
        </div>
        <Tab
          as={React.Fragment}
          menu={{ icon: "labeled", style: { margin: "0" } }}
          panes={this.panes().map(i => ({ menuItem: i[0], render: () => i[1] }))}
          activeIndex={state.app.sidePanel.activeTabIndex}
          onTabChange={(e, { activeIndex }) => dispatch.setActiveSidePanelTab(activeIndex)}
        />
      </div>
    );
  }
}
