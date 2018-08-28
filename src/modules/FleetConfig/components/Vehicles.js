import React from "react";
import propTypes from "prop-types";
import { Header, Button, Grid, Dropdown, Dimmer, Loader } from "semantic-ui-react";
import moment from "moment";
import _ from "lodash";
import DataGrid from "./../../../shared/components/DataGrid";
import Form from "./forms/VehicleForm";
import LocalizationService from "../../../service/LocalizationService";

const localizer = new LocalizationService("fleetConfig");
export default class Vehicles extends React.Component {
  static propTypes = {
    isVehicleListLoading: propTypes.bool.isRequired,
    fetchVehicles: propTypes.func.isRequired,
    vehicles: propTypes.arrayOf(propTypes.object).isRequired,
  }
  render() {
    const { fetchVehicles, isVehicleListLoading } = this.props;
    const addTrigger = <Button content={localizer.string("addVehicle")} icon="plus sign" labelPosition="left" />;
    const editTrigger = <Dropdown.Item text={localizer.string("edit")} icon="edit" key={1} />;
    const deleteTrigger = <Dropdown.Item text={localizer.string("delete")} icon="remove" key={2} />;
    return (
      <React.Fragment>
        <Dimmer active={isVehicleListLoading} inverted>
          <Loader inverted>{localizer.string("loading")}</Loader>
        </Dimmer>
        <Grid>
          <Grid.Column width={12}>
            <Header dividing content={localizer.string("vehicles")} />
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            <Form trigger={addTrigger} fetchVehicles={fetchVehicles} />
          </Grid.Column>
        </Grid>


        <DataGrid
          columnTitles={{
            vin: "VIN",
            plate: localizer.string("plate"),
            moduleId: localizer.string("moduleId"),
            lat: localizer.string("latitude"),
            long: localizer.string("longitude"),
            speed: localizer.string("speed"),
            lastPositionUpdate: localizer.string("lastComm"),
            driver: localizer.string("driver"),
          }}
          operations={[
            <Form trigger={editTrigger} fetchVehicles={fetchVehicles} />,
            <Form trigger={deleteTrigger} />,
          ]}
          dataFormatting={{ lastPositionUpdate: v => moment(v, "YYYYMMDDHHmmss").format("DD.MM.YYYY dddd, HH:mm") }}
          data={this.props.vehicles.map(i => _.omit(i, ["speed"]))}
        />
      </React.Fragment>
    );
  }
}
