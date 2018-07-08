import { divIcon } from "leaflet";
import React from "react";
import propTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";
import { Label } from "semantic-ui-react";
import ReactIcon from "./ReactIcon";
import "./VehicleMarker.scss";


export default class VehicleMarker extends React.Component {
  static propTypes = {
    selected: propTypes.bool.isRequired,
    title: propTypes.string.isRequired,
  }
  icon() {
    const { selected, title } = this.props;
    const iconComponent = (
      <ReactIcon>
        {selected && title && <Label size="large" basic color="blue" className="vehicle-marker-title">{title}</Label>}
        <div
          className={`${selected ? "selected pulse" : "notSelected"} vehicle-marker`}
        />
      </ReactIcon>
    );
    return divIcon({
      className: "custom icon",
      html: ReactDOMServer.renderToString(iconComponent),
    });
  }
  render() {
    const { selected, ...rest } = this.props;
    return <Marker icon={this.icon()} height={12} {... rest} />;
  }
}

