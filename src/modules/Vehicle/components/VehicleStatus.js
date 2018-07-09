import propTypes from "prop-types";
import React from "react";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import FMSIcon from "./../../../shared/components/FMSIcon";
import "./VehicleStatus.scss";

const VehicleStatus = ({
  vin, speed, lat, long, plate, street, district, lastcomm,
}) => (
  <Segment basic secondary id="vehicle-status">
    <Grid divided="vertically">
      <Overview {... { plate, street, district }} />
      <Info {...{ vin, plate }} />
      <Location {...{ lat, long }} />
      <Showcase {...{ speed }} />
      <LastComm {...{ lastcomm }} />
    </Grid>
  </Segment>
);

VehicleStatus.propTypes = {
  vin: propTypes.string.isRequired,
  speed: propTypes.number,
  lat: propTypes.number,
  long: propTypes.number,
  plate: propTypes.string.isRequired,
  street: propTypes.string,
  district: propTypes.string,
  lastcomm: propTypes.string.isRequired,
};

VehicleStatus.defaultProps = {
  speed: 0, lat: null, long: null, street: "", district: "",
};

export default VehicleStatus;

const Overview = ({ plate, street, district }) => (
  <Grid.Row>
    <Grid.Column width={3} verticalAlign="middle">
      <FMSIcon name="truck-front" />
    </Grid.Column>
    <Grid.Column width={13}>
      <Header>
        <span id="overview-plate-display">{plate}</span>
        <Header.Subheader>
          <div>{street}</div>
          <div>{district}</div>
        </Header.Subheader>
      </Header>
    </Grid.Column>
  </Grid.Row>
);
Overview.propTypes = {
  plate: propTypes.string.isRequired,
  street: propTypes.string.isRequired,
  district: propTypes.string.isRequired,
};
const Info = ({ plate, vin }) => (
  <Grid.Row>
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
          <Grid.Column><Header sub content="PLAKA" /></Grid.Column>
          <Grid.Column><div>{plate}</div></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column><Header sub content="SÜRÜCÜ" /></Grid.Column>
          <Grid.Column><div>Ahmet Öztürk</div></Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  </Grid.Row>
);
Info.propTypes = {
  vin: propTypes.string.isRequired,
  plate: propTypes.string.isRequired,
};
const Location = ({ lat, long /* altitude */ }) => (
  <Grid.Row>
    <Grid.Column width={3} verticalAlign="middle">
      <FMSIcon name="location" />
    </Grid.Column>
    <Grid.Column width={13}>
      <Grid className="vehicle-data-display">
        <Grid.Row columns={3} >
          <Grid.Column><Header sub content="ENLEM" /></Grid.Column>
          <Grid.Column><div>{lat}</div></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column><Header sub content="BOYLAM" /></Grid.Column>
          <Grid.Column><div>{long}</div></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column><Header sub content="YÜKSEKLİK" /></Grid.Column>
          <Grid.Column><div>134 m</div></Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  </Grid.Row>
);
Location.propTypes = {
  lat: propTypes.number.isRequired,
  long: propTypes.number.isRequired,
};
const Showcase = ({ speed /* odometer, dailyOdometer */ }) => (
  <Grid.Row style={{ padding: "0", color: "rgb(0,52,120)" }}>
    <Grid.Column
      width={5}
      textAlign="center"
      style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
      }}
    >
      <div style={{ fontFamily: "Ford Antenna", fontSize: "1.5em" }}>{speed} <span style={{ fontSize: "0.6em" }}>km/s</span></div>
      <FMSIcon name="speed" className="i64" />
    </Grid.Column>
    <Grid.Column width={6} textAlign="center">
      <div style={{ fontFamily: "Ford Antenna", fontSize: "1.5em" }}>131,200 <span style={{ fontSize: "0.6em" }}>km</span></div>
      <FMSIcon name="odometer-large" />
    </Grid.Column>
    <Grid.Column width={5} textAlign="center">
      <div style={{ fontFamily: "Ford Antenna", fontSize: "1.5em" }}>145 <span style={{ fontSize: "0.6em" }}>km</span></div>
      <FMSIcon name="odometer-24" />
    </Grid.Column>
  </Grid.Row>
);
Showcase.propTypes = {
  speed: propTypes.number.isRequired,
};
const LastComm = ({ lastcomm }) => (
  <Grid.Row style={{ padding: "0" }} >
    <Grid.Column textAlign="right">
      <Header sub>Son veri:<Header.Subheader>{lastcomm}</Header.Subheader></Header>
    </Grid.Column>
  </Grid.Row>
);
LastComm.propTypes = {
  lastcomm: propTypes.string.isRequired,
};
