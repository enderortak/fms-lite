import React from "react";
import propTypes from "prop-types";
import Slider from "react-slick";
import { Header, Button } from "semantic-ui-react";
import EngTempChart from "./charts/EngTempChart";
import VehStatePieChart from "./charts/VehStatePieChart";
import DriverScore from "./charts/DriverScore";
import SpeedTorqueHeatMap from "./charts/SpeedTorqueHeatMap";
import SpeedLimitViolations from "./charts/SpeedLimitViolations";
import "./../../../../node_modules/slick-carousel/slick/slick.scss";
import "./../../../../node_modules/slick-carousel/slick/slick-theme.scss";
import LocalizationService from "../../../service/LocalizationService";

const localizer = new LocalizationService("quickReports");

export default class QuickReports extends React.Component {
  static propTypes = {
    vehicle: propTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.slideTitles =
    [
      localizer.string("overview"),
      localizer.string("engineTemp"),
      localizer.string("driverEvaluation"),
      localizer.string("engineSpeedTorqueResidencyMap"),
      localizer.string("speedLimitViolationTimeline"),
    ];
    this.state = { slideTitle: this.slideTitles[0] };
  }
  onPrev = () => this.slider.slickPrev();
  onNext = () => this.slider.slickNext();
  slideChange = (prev, next) => this.setState({ slideTitle: this.slideTitles[next] });

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.slideChange,
    };

    return (
      <div style={{ padding: "2em" }}>
        <Header textAlign="center">
          <Button icon="chevron left" basic floated="left" onClick={this.onPrev} style={{ padding: "0" }} />
          {this.state.slideTitle}
          <Button icon="chevron right" basic floated="right" onClick={this.onNext} style={{ padding: "0" }} />
        </Header>
        <Slider ref={(slider) => { this.slider = slider; }} {...settings}>
          <div><VehStatePieChart /></div>
          <div><EngTempChart /></div>
          <div><DriverScore driver={this.props.vehicle.driver} /></div>
          <div><SpeedTorqueHeatMap /></div>
          <div><SpeedLimitViolations /></div>
        </Slider>
      </div>
    );
  }
}
