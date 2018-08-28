import React from "react";
import propTypes from "prop-types";
import { TileLayer } from "react-leaflet";


const Tiles = ({ mapTile, overlays }) => (
  <React.Fragment>
    <TileLayer zIndex={1} {...mapTile.options} />
    {
        overlays.map((i, ind) => <TileLayer zIndex={ind + 10} {...i.options} />)
    }
  </React.Fragment>
);

Tiles.propTypes = {
  mapTile: propTypes.shape({
    options: propTypes.object.isRequired,
  }).isRequired,
  overlays: propTypes.arrayOf(propTypes.shape({
    options: propTypes.object.isRequired,
  })).isRequired,
};

export default Tiles;

