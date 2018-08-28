import React from "react";
import propTypes from "prop-types";
import { Tab, Icon, Menu } from "semantic-ui-react";
import FMSIcon from "./../../../shared/components/FMSIcon";
import ComingSoon from "./../../../shared/components/ComingSoon";
import "./SidePanel.scss";
import VehicleSidePanelDisplay from "./../../Vehicle/VehicleSidePanelDisplay";
import LocalizationService from "../../../service/LocalizationService";

const loc = new LocalizationService("sidePanel");
export default class SidePanel extends React.Component {
  static showSettings(event) {
    event.preventDefault();
  }
  static propTypes = {
    isSidePanelVisible: propTypes.bool.isRequired,
    sidePanelActiveTab: propTypes.number.isRequired,
    onSidePanelToggleClick: propTypes.func.isRequired,
    onSidePanelTabChange: propTypes.func.isRequired,
  }
  panes() {
    return [
      [
        <Menu.Item key="Tab 1"><i className="ui icon ui-icon-truck-front" />{loc.string("vehicle")}</Menu.Item>,
        <Tab.Pane as={VehicleSidePanelDisplay} />,
      ],
      [
        <Menu.Item key="Tab 2"><Icon name="object group" />{loc.string("groupsTab")}</Menu.Item>,
        <Tab.Pane>
          <ComingSoon />
        </Tab.Pane>,
      ],
      [
        <Menu.Item key="Tab 3"><FMSIcon name="fleet" />{loc.string("fleet")}</Menu.Item>,
        <Tab.Pane><ComingSoon /></Tab.Pane>,
      ],
      [
        <Menu.Item key="Tab 4"><Icon name="compass" />{loc.string("legendTab")}</Menu.Item>,
        <Tab.Pane><ComingSoon /><Icon name="chevron right" /></Tab.Pane>,
      ],
    ];
  }
  render() {
    const {
      isSidePanelVisible, sidePanelActiveTab,
      onSidePanelToggleClick, onSidePanelTabChange,
    } = this.props;
    return (
      <div id="side-panel" className={isSidePanelVisible ? "open" : ""}>
        <div
          className="toggle-panel"
          onClick={() => onSidePanelToggleClick(isSidePanelVisible)}
        >
          <Icon name={`chevron ${isSidePanelVisible ? "right" : "left"}`} />
        </div>
        <Tab
          as={React.Fragment}
          menu={{ icon: "labeled", style: { margin: "0" } }}
          panes={this.panes().map(i => ({ menuItem: i[0], render: () => i[1] }))}
          activeIndex={sidePanelActiveTab}
          onTabChange={(e, { activeIndex }) => onSidePanelTabChange(activeIndex)}
        />
      </div>
    );
  }
}
