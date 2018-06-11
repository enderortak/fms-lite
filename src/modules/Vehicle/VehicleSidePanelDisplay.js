
import moment from "moment";
import React from "react";
import { Grid, GridColumn, Item, Segment, Tab } from "semantic-ui-react";
import GeocodingService from "../../service/GeocodingService";
import VehicleDataDisplay from "./components/VehicleDataDisplay";
import Showcase from "./components/Showcase";

const geocoder = new GeocodingService();


export default class VehicleSidePanelDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { street: "", district: "", activeTab: 0 };
    this.renderVehicleDisplay = this.renderVehicleDisplay.bind(this);
    this.panes = this.panes.bind(this);
  }

  componentDidMount() {
    if (this.props.vehicle) {
      this.setState({ street: "", district: "" });
      geocoder.reverse(this.props.vehicle.lat, this.props.vehicle.long)
        .then(result => this.setState({ street: result.street, district: result.district }));
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.vehicle &&
        (!prevProps.vehicle || prevProps.vehicle.vehicleId !== this.props.vehicle.vehicleId)
    ) {
      this.setState({ street: "", district: "" });
      geocoder.reverse(this.props.vehicle.lat, this.props.vehicle.long)
        .then(result => this.setState({ street: result.street, district: result.district }));
    }
  }

  panes() {
    const { vehicle } = this.props;
    return [
      {
        menuItem: "Durum",
        render: () => (
          <Tab.Pane
            attached={false}
            as={Showcase}
            plate={vehicle.plate}
            speed={vehicle.speed}
            lat={vehicle.lat}
            long={vehicle.long}
            street={this.state.street}
            district={this.state.district}
            lastcomm={moment(vehicle.lastPositionUpdate, "YYYYMMDDHHmmss").format("DD.MM.YYYY HH:mm")}
          />
        ),
      },
      { menuItem: "Bildirimler", render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
      { menuItem: "Geçmiş", render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
      { menuItem: "Hızlı Raporlar", render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane> },
      { menuItem: "Ayarlar", render: () => <Tab.Pane attached={false}>Tab 5 Content</Tab.Pane> },
    ];
  }
  renderVehicleDisplay() {
    const { vehicle } = this.props;
    return (
      <React.Fragment>
        <Showcase />
      </React.Fragment>
    );
  }
  render() {
    const { vehicle } = this.props;
    return (
      <React.Fragment>
        {!vehicle && <Segment>Seçili araç yok</Segment>}
        {vehicle && <Tab menu={{ secondary: true, pointing: true, style: { marginBottom: "0" } }} panes={this.panes()} />}
      </React.Fragment>
    );
  }
}
