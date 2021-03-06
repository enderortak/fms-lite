import React from "react";
import propTypes from "prop-types";
import ReactDOMServer from "react-dom/server";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import { Icon, Label } from "semantic-ui-react";

import MarkerIcon from "./MarkerIcon";
import "./SearchMarker.scss";

export default class SearchMarker extends React.Component {
  static propTypes = {
    searchMarker: propTypes.shape({
      label: propTypes.string.isRequired,
      latlon: propTypes.arrayOf(propTypes.number).isRequired,
    }),
  }
  static defaultProps = { searchMarker: null }
  icon() {
    const { label } = this.props.searchMarker;
    const iconComponent = (
      <MarkerIcon>
        <div id="search-marker">
          <div className="marker-label">
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

      </MarkerIcon>
    );
    return divIcon({
      className: "custom icon",
      html: ReactDOMServer.renderToString(iconComponent),
    });
  }
  render() {
    if (this.props.searchMarker) {
      const { latlon, ...rest } = this.props.searchMarker;
      return <Marker className="search" icon={this.icon()} position={latlon} {... rest} />;
    }
    return null;
  }
}
