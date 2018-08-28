import propTypes from "prop-types";
import React from "react";
import moment from "moment";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import AsyncContent from "react-promise";
import _ from "lodash";
import FMSIcon from "./../../../shared/components/FMSIcon";
import GeocodingService from "./../../../service/GeocodingService";
import "./VehicleStatus.scss";
import LocalizationService from "../../../service/LocalizationService";

const geocoder = new GeocodingService();
const loc = new LocalizationService("vehicleDisplay");


export default class VehicleStatus extends React.PureComponent {
  static propTypes = {
    vehicle: propTypes.object.isRequired,
  }
  render() {
    const {
      plate, vin, lat, long, speed, driver, lastPositionUpdate,
    } = this.props.vehicle;
    const lastcomm = moment(lastPositionUpdate, "YYYYMMDDHHmmss").format("DD.MM.YYYY HH:mm");
    const overview = (
      <Grid.Row key={_.uniqueId()}>
        <Grid.Column width={3} verticalAlign="middle">
          <FMSIcon name="truck-front" />
        </Grid.Column>
        <Grid.Column width={13}>
          <Header>
            <span id="overview-plate-display">{plate}</span>
            <Header.Subheader>
              <AsyncContent
                promise={geocoder.reverseGeocode({ lat, long })}
                then={data => [data.level2, data.level1, data.level0].map((i, ind) => <div key={ind}>{i}</div>)}
              />
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
    );
    const info = (
      <Grid.Row key={_.uniqueId()}>
        <Grid.Column width={3} verticalAlign="middle">
          <Icon name="info circle" />
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid className="vehicle-data-display">
            <Grid.Row columns={3}>
              <Grid.Column><Header sub content="VIN" /></Grid.Column>
              <Grid.Column><div>{vin}</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column><Header sub content={loc.stringUppercase("plate")} /></Grid.Column>
              <Grid.Column><div>{plate}</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column><Header sub content={loc.stringUppercase("driver")} /></Grid.Column>
              <Grid.Column><div>{driver}</div></Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    );
    const location = (
      <Grid.Row key={_.uniqueId()}>
        <Grid.Column width={3} verticalAlign="middle">
          <FMSIcon name="location" />
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid className="vehicle-data-display">
            <Grid.Row columns={3} >
              <Grid.Column><Header sub content={loc.stringUppercase("latitude")} /></Grid.Column>
              <Grid.Column><div>{lat}</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column><Header sub content={loc.stringUppercase("longitude")} /></Grid.Column>
              <Grid.Column><div>{long}</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column><Header sub content={loc.stringUppercase("altitude")} /></Grid.Column>
              <Grid.Column><div>134 m</div></Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    );
    const showcase = (
      <Grid.Row id="vehicle-status-showcase" key={_.uniqueId()}>
        <Grid.Column
          width={5}
          textAlign="center"
          className="speed-view"
        >
          <div >{speed} <span>km/s</span></div>
          <FMSIcon name="speed" className="i64" />
        </Grid.Column>
        <Grid.Column width={6} textAlign="center">
          <div >131,200 <span >km</span></div>
          <FMSIcon name="odometer-large" />
        </Grid.Column>
        <Grid.Column width={5} textAlign="center">
          <div >145 <span >km</span></div>
          <FMSIcon name="odometer-24" />
        </Grid.Column>
      </Grid.Row>
    );
    const lastComm = (
      <Grid.Row id="vehicle-status-last-comm" key={_.uniqueId()}>
        <Grid.Column textAlign="right">
          <Header sub>{loc.stringUppercase("lastComm")}<Header.Subheader>{lastcomm}</Header.Subheader></Header>
        </Grid.Column>
      </Grid.Row>
    );
    return (
      <Segment basic secondary id="vehicle-status">
        <Grid divided="vertically">
          {[overview, info, location, showcase, lastComm]}
        </Grid>
      </Segment>
    );
  }
}

