import React from "react";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import { Icon, Label } from "semantic-ui-react";

import ReactIcon from "./ReactIcon";
import "./VehicleMarker.scss";

export default class VehicleMarker extends React.Component {
  icon() {
    const { selected, state, title } = this.props;
    const iconComponent = (
      <ReactIcon>
        {selected && title && <Label size="large" basic color="blue" className="vehicle-marker-title">{title}</Label>}
        <div
          className={`${selected ? "selected pulse" : "notSelected"} vehicle-marker`}
          style={{
            background: "radial-gradient(circle at 5px 5px, #5cabff, #000)",
         }}
        />
      </ReactIcon>
    );
    return divIcon({
      className: "custom icon",
      html: ReactDOMServer.renderToString(iconComponent),
    });
  }
  render() {
    const { selected, state, ...rest } = this.props;
    return <Marker icon={this.icon()} height={20} {... rest} />;
  }
}

