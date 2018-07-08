import React from "react";
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
export default ComingSoon;

