import React from "react";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import { Icon, Label, Popup } from "semantic-ui-react";

import ReactIcon from "./ReactIcon";
import "./SearchMarker.scss";

export default class SearchMarker extends React.Component {
  icon() {
    const { label } = this.props.searchMarker;
    const iconComponent = (
      <ReactIcon>
        <div style={{
 width: "100%", height: "100%", display: "flex", flexDirection: "column-reverse", alignItems: "center",
}}
        >
          <div style={{ textAlign: "center" }}>
            {label && <Label size="large" basic color="blue" >{label}</Label>}
            <Icon
              name="map marker alternate"
              style={{
              margin: ".25em 0 0 0",
            fontSize: "3em",
color: "rgba(0, 52, 120, 0.9)",
lineHeight: "1em",
textShadow: "2px 2px #FFFFFF, -2px -2px #FFFFFF, -2px 2px #FFFFFF, 2px -2px #FFFFFE",
          }}
            />
          </div>
        </div>

      </ReactIcon>
    );
    return divIcon({
      className: "custom icon",
      html: ReactDOMServer.renderToString(iconComponent),
    });
  }
  render() {
    const { latlon, ...rest } = this.props.searchMarker;
    return <Marker className="search" icon={this.icon()} position={latlon} {... rest} />;
  }
}
