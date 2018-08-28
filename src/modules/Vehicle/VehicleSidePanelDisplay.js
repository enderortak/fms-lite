
import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Segment, Tab, Message, Icon } from "semantic-ui-react";
import VehicleStatus from "./components/VehicleStatus";
import VehicleNotifications from "./components/VehicleNotifications";
import QuickReports from "./components/QuickReports";
import History from "./components/History";
import FMSIcon from "./../../shared/components/FMSIcon";
import ComingSoon from "./../../shared/components/ComingSoon";
import { enterPlaybackMode } from "./../Playback/Playback.Actions";
import { setSidePanelVisibility } from "./../App/App.Actions";
import LocalizationService from "../../service/LocalizationService";

const localizer = new LocalizationService("vehicleDisplay");
class VehicleSidePanelDisplay extends React.Component {
  static propTypes = {
    vehicle: propTypes.object,
    enterPlaybackMode: propTypes.func.isRequired,
    hideSidePanel: propTypes.func.isRequired,
  }
  static defaultProps = { vehicle: null }

  render() {
    const { vehicle } = this.props;
    const overviewTab = () => (
      <Tab.Pane attached={false} as={VehicleStatus} vehicle={vehicle} />
    );
    const notificationsTab = () => <Tab.Pane as={VehicleNotifications} attached={false} notifications={notifications} />;
    const historyTab = () => (
      <Tab.Pane
        as={History}
        attached={false}
        hideSidePanel={this.props.hideSidePanel}
        enterPlaybackMode={this.props.enterPlaybackMode}
      />
    );
    const quickReportsTab = () => <Tab.Pane as={QuickReports} attached={false} vehicle={this.props.vehicle} />;
    const vehicleConfigTab = () => <Tab.Pane attached={false} style={{ flex: "1" }}><ComingSoon /></Tab.Pane>;
    const panes = [
      { menuItem: localizer.string("overviewTab"), render: overviewTab },
      { menuItem: localizer.string("notificationsTab"), render: notificationsTab },
      { menuItem: localizer.string("historyTab"), render: historyTab },
      { menuItem: localizer.string("quickReportsTab"), render: quickReportsTab },
      { menuItem: localizer.string("vehicleConfigTab"), render: vehicleConfigTab },
    ];
    const noSelectedVehicle = (
      <Segment basic>
        <Message icon>
          <Icon name="info circle" /><Message.Content>{localizer.string("noSelectedVehicle")}</Message.Content>
        </Message>
      </Segment>
    );
    return (
      <React.Fragment>
        {!vehicle && noSelectedVehicle}
        {vehicle &&
          <Tab
            as={React.Fragment}
            menu={{ secondary: true, pointing: true, style: { marginBottom: "0" } }}
            panes={panes}
          />
        }
      </React.Fragment>
    );
  }
}

const state2Props = state => ({
  vehicle: state.map.vehicles.filter(i => i.vin === state.map.selectedVehicle)[0],
});

const dispatch2Props = dispatch => ({
  enterPlaybackMode: historyData => dispatch(enterPlaybackMode(historyData)),
  hideSidePanel: () => dispatch(setSidePanelVisibility(false)),
});

export default connect(state2Props, dispatch2Props)(VehicleSidePanelDisplay);

const notifications = [
  {
    date: moment().subtract(3, "hours"),
    text: localizer.string("keyOn", "vehicleNotifications"),
    icon: <FMSIcon name="key-on" color="black" />,
  },
  {
    date: moment().subtract(3, "hours").add(3, "minutes"),
    text: localizer.string("startedToMove", "vehicleNotifications"),
    icon: <FMSIcon name="flag-o" color="black" />,
  },
  {
    date: moment().subtract(3, "hours").add(15, "minutes"),
    text: localizer.string("gpsLost", "vehicleNotifications"),
    icon: <FMSIcon name="no-gps" color="black" />,
  },
  {
    date: moment().subtract(3, "hours").add(17, "minutes"),
    text: localizer.string("gpsReconnected", "vehicleNotifications"),
    icon: <FMSIcon name="gps" color="black" />,
  },
  {
    date: moment().subtract(2, "hours"),
    text: localizer.string("speedLimitViolated", "vehicleNotifications"),
    icon: <FMSIcon.SpeedLimit value="130" color="red" size="large" />,
  },
  {
    date: moment().subtract(2, "hours").add(3, "minutes"),
    text: localizer.string("endOfSpeedLimitViolation", "vehicleNotifications"),
    icon: <FMSIcon.SpeedLimit value="130" color="red" size="large" falling />,
  },
  {
    date: moment().subtract(2, "hours").add(15, "minutes"),
    text: localizer.string("gpsLost", "vehicleNotifications"),
    icon: <FMSIcon name="no-gps" color="black" />,
  },
  {
    date: moment().subtract(2, "hours").add(17, "minutes"),
    text: localizer.string("gpsReconnected", "vehicleNotifications"),
    icon: <FMSIcon name="gps" color="black" />,
  },
  {
    date: moment().subtract(2, "hours").add(35, "minutes"),
    text: localizer.string("stopped", "vehicleNotifications"),
    icon: <FMSIcon name="flag-o-dont" color="black" />,
  },
  {
    date: moment().subtract(2, "hours").add(40, "minutes"),
    text: localizer.string("startedToMove", "vehicleNotifications"),
    icon: <FMSIcon name="flag-o" color="black" />,
  },
  {
    date: moment().subtract(1, "hours").add(5, "minutes"),
    text: localizer.string("stopped", "vehicleNotifications"),
    icon: <FMSIcon name="flag-o-dont" color="black" />,
  },
  {
    date: moment().subtract(1, "hours").add(6, "minutes"),
    text: localizer.string("keyOff", "vehicleNotifications"),
    icon: <FMSIcon name="key-off" color="black" />,
  },
].reverse();
