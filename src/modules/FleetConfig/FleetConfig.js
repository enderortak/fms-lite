import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Menu, Grid, Segment } from "semantic-ui-react";
import { showFleetConfigModal, hideFleetConfigModal, setFleetConfigActiveTab } from "./FleetConfig.Actions";
import { fetchVehicles } from "./../Map/Map.Actions";
import Vehicles from "./components/Vehicles";
import "./FleetConfig.scss";
import ComingSoon from "./../../shared/components/ComingSoon";


class FleetConfig extends React.Component {
  constructor(props) {
    super(props);
    this.panes = this.panes.bind(this);
  }
  panes = () => [<Vehicles vehicles={this.props.state.map.vehicles} dispatch={this.props.dispatch} />,

    <ComingSoon limitedSize />,
    <ComingSoon limitedSize />,
    <ComingSoon limitedSize />,
    <ComingSoon limitedSize />,
  ];
  render() {
    const { state, dispatch } = this.props;
    return (
      <Modal
        size="fullscreen"
        open={state.fleetConfig.visible}
        onClose={dispatch.hideModal}
        id="fleet-config"
        closeIcon
      >
        <Modal.Header>Filo Yönetimi</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={3}>
              <Menu vertical style={{ width: "auto" }}>
                {
                  ["Araçlar", "Araç Grupları", "Sürücüler", "Binalar/Bölgeler", "Rotalar"]
                  .map((i, ind) => (
                    <Menu.Item
                      as="a"
                      key={`menu${ind}`}
                      active={state.fleetConfig.activeTab === ind}
                      onClick={() => dispatch.setActiveTab(ind)}
                      content={i}
                    />))
                }
              </Menu>
            </Grid.Column>
            <Grid.Column width={13}>
              <Segment style={{ minHeight: "15em" }}>
                {this.panes()[state.fleetConfig.activeTab]}
              </Segment>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

const state2Props = state => ({ state: { ...state } });
const dispatch2Props = dispatch => ({
  dispatch: {
    showModal: () => dispatch(showFleetConfigModal()),
    hideModal: () => dispatch(hideFleetConfigModal()),
    setActiveTab: tabIndex => dispatch(setFleetConfigActiveTab(tabIndex)),
    fetchVehicles: user => dispatch(fetchVehicles(user)),
  },
});


export default connect(state2Props, dispatch2Props)(FleetConfig);
