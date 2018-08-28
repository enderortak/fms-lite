import React from "react";
import propTypes from "prop-types";
import "./FMSIcon.scss";

const FMSIcon = ({
  name, size, color, className, ...rest
}) => {
  const prefix = "ui-icon-";
  const c = ["ui", size, color, prefix + name, "icon", className];
  return (
    <i className={c.join(" ")} {...rest} />
  );
};
FMSIcon.propTypes = {
  name: propTypes.string.isRequired,
  size: propTypes.string,
  color: propTypes.string,
  className: propTypes.string,
};
FMSIcon.defaultProps = {
  size: null, color: null, className: null,
};
FMSIcon.SpeedLimit = ({
  value, size, color, className, falling, ...rest
}) => {
  const c = ["ui", size, color, !falling ? "circle outline" : "dont", "icon", className];
  return (
    <i className="fms-speed icons" {...rest}>
      <i className={c.join(" ")} />
      <span className="icon" >{value}</span>
    </i>
  );
};
FMSIcon.SpeedLimit.propTypes = {
  value: propTypes.number.isRequired,
  falling: propTypes.bool,
  size: propTypes.string,
  color: propTypes.string,
  className: propTypes.string,
};
FMSIcon.SpeedLimit.defaultProps = {
  size: null, color: null, className: null, falling: false,
};

export default FMSIcon;
