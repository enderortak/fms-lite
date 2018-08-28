import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Menu, Grid, Segment } from "semantic-ui-react";
import _ from "lodash";
import { hideFleetConfigModal, setFleetConfigActiveTab } from "./FleetConfig.Actions";
import { fetchVehicles } from "./../Map/Map.Actions";
import Vehicles from "./components/Vehicles";
import "./FleetConfig.scss";
import ComingSoon from "./../../shared/components/ComingSoon";
import LocalizationService from "../../service/LocalizationService";

const localizer = new LocalizationService("fleetConfig");


class FleetConfig extends React.Component {
  static propTypes = {
    isModalOpen: propTypes.bool.isRequired,
    activeTab: propTypes.number.isRequired,
    vehicles: propTypes.arrayOf(propTypes.object).isRequired,
    isVehicleListLoading: propTypes.bool.isRequired,
    hideModal: propTypes.func.isRequired,
    setActiveTab: propTypes.func.isRequired,
    fetchVehicles: propTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.panes = this.panes.bind(this);
  }
  panes = () => [
    <Vehicles
      fetchVehicles={this.props.fetchVehicles}
      vehicles={this.props.vehicles}
      isVehicleListLoading={this.props.isVehicleListLoading}
    />,
    <ComingSoon limitedSize />,
    <ComingSoon limitedSize />,
    <ComingSoon limitedSize />,
    <ComingSoon limitedSize />,
  ];
  render() {
    const {
      isModalOpen, activeTab,
      hideModal, setActiveTab,
    } = this.props;
    return (
      <Modal
        size="fullscreen"
        open={isModalOpen}
        onClose={hideModal}
        id="fleet-config"
        closeIcon
      >
        <Modal.Header>{localizer.string("title")}</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={3}>
              <Menu vertical>
                {
                  [
                    localizer.string("vehicles"),
                    localizer.string("vehicleGroups"),
                    localizer.string("drivers"),
                    localizer.string("buildingsAreas"),
                    localizer.string("routes"),
                  ]
                  .map((i, ind) => (
                    <Menu.Item
                      as="a"
                      key={_.uniqueId()}
                      active={activeTab === ind}
                      onClick={() => setActiveTab(ind)}
                      content={i}
                    />))
                }
              </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
              <Segment style={{ minHeight: "15em" }}>
                {this.panes()[activeTab]}
              </Segment>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

const state2Props = state => ({
  isModalOpen: state.fleetConfig.visible,
  isVehicleListLoading: state.map.loading,
  activeTab: state.fleetConfig.activeTab,
  vehicles: state.map.vehicles,
});
const dispatch2Props = dispatch => ({
  hideModal: () => dispatch(hideFleetConfigModal()),
  setActiveTab: tabIndex => dispatch(setFleetConfigActiveTab(tabIndex)),
  fetchVehicles: user => dispatch(fetchVehicles(user)),
});


export default connect(state2Props, dispatch2Props)(FleetConfig);
