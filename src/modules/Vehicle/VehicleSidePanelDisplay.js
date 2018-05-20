
import React from "react";
import { RadialGauge } from "react-canvas-gauges";
import { Header, Icon, Segment, Item, Label } from "semantic-ui-react";
import "./../../shared/style/fonts/grandnationalsuperital.css";
import GeocodingService from "../../service/GeocodingService";

const geocoder = new GeocodingService();

const lightTheme = {
  highlights: [{ from: 110, to: 130, color: "rgba(0, 52, 120, .75)" }],
  colorPlate: "#FFF",
  colorMajorTicks: "#bbe0ec",
  colorMinorTicks: "#9fbcc5",
  colorTitle: "#fff",
  colorUnits: "rgba(0, 52, 120, .75)",
  colorNumbers: "rgba(0, 52, 120, .75)",
  colorNeedleStart: "rgba(240, 128, 128, 1)",
  colorNeedleEnd: "rgba(255, 160, 122, .9)",
  colorNeedleShadowDown: "#333",
};

const darkTheme = {
  highlights: [{ from: 110, to: 130, color: "rgba(200, 50, 50, .75)" }],
  colorPlate: "#222",
  colorMajorTicks: "#f5f5f5",
  colorMinorTicks: "#ddd",
  colorTitle: "#fff",
  colorUnits: "#ccc",
  colorNumbers: "lightblue",
  colorNeedleStart: "rgba(240, 128, 128, 1)",
  colorNeedleEnd: "rgba(255, 160, 122, .9)",
  colorNeedleShadowDown: "#333",
};

export default class VehicleSidePanelDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
    // this.renderVehicleDisplay = this.renderVehicleDisplay.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (
      nextProps.vehicle &&
        (!this.props.vehicle || this.props.vehicle.vehicleId !== nextProps.vehicle.vehicleId)
    ) {
      this.setState({ address: "" });
      geocoder.reverse(nextProps.vehicle.lat, nextProps.vehicle.long)
        .then(result => this.setState({ address: result.display_name }));
    }
  }
  renderVehicleDisplay(vehicle) {
    return (
      <React.Fragment>
        <Segment>
          <Item.Group>
            <Item>
              <i className="ui icon ui-icon-truck-front" style={{ fontSize: "5rem" }} />
              <Item.Content>
                <Item.Header>{vehicle.plate}</Item.Header>
                <Item.Meta style={{ minHeight: "2em" }}>
                  <span>{this.state.address}</span>
                </Item.Meta>
                <Item.Description>asd</Item.Description>
                <Item.Extra>
                  <Label>IMAX</Label>
                  <Label icon="globe" content="Additional Languages" />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment style={{
        //  background: "#222",
         background: "#FFF",
         height: "17rem",
        overflow: "hidden",
        textAlign: "center",
        }}
        >
          <RadialGauge
            height={300}
            width={300}
            units="Km/h"
            title={false}
            animateOnInit
            value={50}
            minValue={0}
            maxValue={130}
            exactTicks
            majorTicks={[0, 10, 30, 50, 70, 90, 110, 130]}
            minorTicks={2}
            strokeTicks
            valueBox={false}
            //   fontValue="Repetition"
            fontNumbers="Grand National Super-Italic"
            fontUnits="Grand National Super-Italic"
                // fontNumbersSize="16"
            animatedValue
            borders={false}
            borderShadowWidth={0}
            needleType="arrow"
            needleWidth={2}
            needleCircleSize={7}
            needleCircleOuter
            needleCircleInner={false}
            animationDuration={1500}
            animationRule="linear"
            ticksAngle={200}
            startAngle={80}
            valueBoxWidth={45}
            {...lightTheme}
          />
        </Segment>
      </React.Fragment>
    );
  }
  render() {
    const { vehicle } = this.props;
    return (
      <React.Fragment>
        {!vehicle && <Segment>Seçili araç yok</Segment>}
        {vehicle && this.renderVehicleDisplay(vehicle)}
      </React.Fragment>
    );
  }
}
