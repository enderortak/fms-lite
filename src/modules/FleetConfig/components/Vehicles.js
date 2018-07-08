import React from "react";
import { Header, Button, Grid, Dropdown, Dimmer, Loader } from "semantic-ui-react";
import moment from "moment";
import _ from "lodash";
import DataGrid from "./../../../shared/components/DataGrid";
import Form from "./forms/VehicleForm";
import ApiService from "../../../service/ApiService";
import AuthService from "../../../service/AuthService";

export default class Vehicles extends React.Component {
  state = { processing: false, vehicles: [] }
  componentDidMount() {
    this.getVehicles();
  }
  getVehicles = () => {
    this.setState({ processing: true });
    this.apiService
      .fetch(`vehicles/${this.authService.getProfile().username}`, "GET")
      .then(res => this.setState({ vehicles: res, processing: false }));
  }
  apiService = new ApiService();
  authService = new AuthService();

  render() {
    const { dispatch } = this.props;
    return (
      <React.Fragment>
        <Dimmer active={this.state.processing} inverted>
          <Loader inverted>Yükleniyor</Loader>
        </Dimmer>
        <Grid>
          <Grid.Column width={12}><Header dividing content="Araçlar" /></Grid.Column>
          <Grid.Column width={4} textAlign="right"><Form trigger={<Button content="Yeni Araç" icon="plus sign" labelPosition="left" />} dispatch={dispatch} /></Grid.Column>
        </Grid>


        <DataGrid
          columnTitles={{
            vin: "VIN",
            plate: "Plaka",
            moduleId: "Modül ID",
            lat: "Enlem",
            long: "Boylam",
            speed: "Hız",
            lastPositionUpdate: "Son Bildirim",
          }}
          operations={[
            <Form trigger={<Dropdown.Item text="Düzenle" icon="edit" key={1} />} dispatch={dispatch} />,
            <Form trigger={<Dropdown.Item text="Sil" icon="remove" key={2} />} />,
          ]}
          dataFormatting={{ lastPositionUpdate: v => moment(v, "YYYYMMDDHHmmss").format("DD.MM.YYYY dddd, HH:mm") }}
          data={this.state.vehicles.map(i => _.omit(i, ["speed"]))}
        />
      </React.Fragment>
    );
  }
}
