import React from "react";
import propTypes from "prop-types";
import svg from "./ComingSoon.svg";
import "./ComingSoon.scss";

const ComingSoon = ({ limitedSize }) => (
  <div id="coming-soon">
    <img
      src={svg}
      alt="Coming soon"
      style={{ maxHeight: limitedSize ? "20em" : undefined, maxWidth: limitedSize ? "20em" : undefined }}
    />
  </div>
);
ComingSoon.propTypes = {
  limitedSize: propTypes.string,
};
ComingSoon.defaultProps = { limitedSize: null };
export default ComingSoon;

