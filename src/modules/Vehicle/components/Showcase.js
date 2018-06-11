import React from "react";
import { Grid, Segment, Image, Header, Item, Icon } from "semantic-ui-react";
import VehicleDataDisplay from "./VehicleDataDisplay";
import locationIcon from "./location.png";
import speedIcon from "./speed.png";
import odometerTotalIcon from "./odometer_total.png";
import odometerDailyIcon from "./odometer_daily.png";

const Showcase = ({
  speed, lat, long, plate, street, district, lastcomm,
}) => (
  <Segment inverted style={{ background: "rgba(0, 52, 120, 0.7)", borderRadius: "0", marginTop: "0" }}>
    <Grid divided="vertically">
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle">
          <i className="ui icon ui-icon-truck-front" style={{ fontSize: "48px", width: "48px", color: "#FFFFFF" }} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Header inverted>
            <span style={{ fontFamily: "Ford Antenna" }}>{plate}</span>
            <Header.Subheader style={{ minHeight: "3em" }}>
              <div>{street}</div>
              <div>{district}</div>
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle">
          <Icon
            name="info circle"
            style={{
 fontSize: "48px", width: "48px", color: "#FFFFFF", lineHeight: "1",
}}
          />
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid>
            <Grid.Row columns={3} style={{ paddingBottom: "0" }} >
              <Grid.Column><Header sub inverted content="PLAKA" /></Grid.Column>
              <Grid.Column><div>{plate}</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} style={{ paddingBottom: "0", paddingTop: "0.3rem" }} >
              <Grid.Column><Header sub inverted content="SÜRÜCÜ" /></Grid.Column>
              <Grid.Column><div>Ahmet Öztürk</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} style={{ paddingBottom: "0", paddingTop: "0.3rem" }} >
              <Grid.Column><Header sub inverted content="VIN" /></Grid.Column>
              <Grid.Column><div>JTHBK1EG3C25011011</div></Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3} verticalAlign="middle">
          <Image src={locationIcon} width={48} style={{ display: "inline-block" }} />
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid>
            <Grid.Row columns={3} style={{ paddingBottom: "0" }} >
              <Grid.Column><Header sub inverted content="ENLEM" /></Grid.Column>
              <Grid.Column><div>{lat}</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} style={{ paddingBottom: "0", paddingTop: "0.3rem" }} >
              <Grid.Column><Header sub inverted content="BOYLAM" /></Grid.Column>
              <Grid.Column><div>{long}</div></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} style={{ paddingBottom: "0", paddingTop: "0.3rem" }} >
              <Grid.Column><Header sub inverted content="YÜKSEKLİK" /></Grid.Column>
              <Grid.Column><div>134 m</div></Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: "0" }}>
        <Grid.Column
          width={5}
          textAlign="center"
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
            }}
        >
          <div style={{ fontFamily: "Ford Antenna", fontSize: "1.5em" }}>{speed} <span style={{ fontSize: "0.6em" }}>km/s</span></div>
          <Image src={speedIcon} width={64} style={{ display: "inline-block" }} />
        </Grid.Column>
        <Grid.Column width={6} textAlign="center">
          <div style={{ fontFamily: "Ford Antenna", fontSize: "1.5em" }}>131,200 <span style={{ fontSize: "0.6em" }}>km</span></div>
          <Image src={odometerTotalIcon} width={48} style={{ display: "inline-block" }} />
        </Grid.Column>
        <Grid.Column width={5} textAlign="center">
          <div style={{ fontFamily: "Ford Antenna", fontSize: "1.5em" }}>145 <span style={{ fontSize: "0.6em" }}>km</span></div>
          <Image src={odometerDailyIcon} width={48} style={{ display: "inline-block" }} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: "0" }} >
        <Grid.Column textAlign="right">
          <Header sub inverted>Son veri:<Header.Subheader>{lastcomm}</Header.Subheader></Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);
export default Showcase;
