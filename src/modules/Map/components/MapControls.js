import propTypes from "prop-types";
import React from "react";
import Control from "react-leaflet-control";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import MeasureControl from "./../../Measure/Measure";
import "./MapControls.scss";

export default class MapControls extends React.Component {
  render() {
    const {
      onZoomIn, onZoomOut, onViewportReset, onMapTileChange, onMapOverlayChange, onMenuClick,
      mapTiles, activeMapTile, activeOverlays, mapWidth, mapOverlays,
    } = this.props;
    return (
      <Control position="bottomleft">
        <Menu icon compact color="grey" inverted id="map-control-bar" onClick={onMenuClick}>
          <Menu.Item as="a" onClick={onZoomIn}>
            <Icon name="plus" />
          </Menu.Item>
          <Menu.Item as="a" onClick={onZoomOut}>
            <Icon name="minus" />
          </Menu.Item>
          <Menu.Item as="a" onClick={onViewportReset}>
            <Icon name="expand" />
          </Menu.Item>
          <Dropdown item icon="map outline" upward inline>
            <Dropdown.Menu>
              <Dropdown.Header>HARİTALAR</Dropdown.Header>
              {
                mapTiles.map((i) => {
                  const props = {
                    key: i.name,
                    onClick: () => { onMapTileChange(i.name); },
                    content: i.label,
                    active: activeMapTile === i.name,
                    icon: activeMapTile === i.name ? "checkmark" : "",
                  };
                  return <Dropdown.Item {...props} />;
                })
              }
              <Dropdown.Header>KAPLAMALAR</Dropdown.Header>
              {
                mapOverlays.map((i) => {
                  const props = {
                    key: i.name,
                    onClick: () => { onMapOverlayChange(i.name); },
                    content: i.label,
                    active: activeOverlays.includes(i.name),
                    icon: activeOverlays.includes(i.name) ? "checkmark" : "",
                  };
                  return <Dropdown.Item {...props} />;
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          <MeasureControl />
          <Menu.Item>{mapWidth} km</Menu.Item>
        </Menu>
      </Control>
    );
  }
}

MapControls.propTypes = {
  onZoomIn: propTypes.func.isRequired,
  onZoomOut: propTypes.func.isRequired,
  onViewportReset: propTypes.func.isRequired,
  onMapTileChange: propTypes.func.isRequired,
  onMapOverlayChange: propTypes.func.isRequired,
  onMenuClick: propTypes.func.isRequired,
  activeMapTile: propTypes.string.isRequired,
  activeOverlays: propTypes.arrayOf(propTypes.string).isRequired,
  mapWidth: propTypes.number.isRequired,
  mapTiles: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
  })).isRequired,
  mapOverlays: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
  })).isRequired,
};
