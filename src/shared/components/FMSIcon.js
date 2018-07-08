import React from "react";
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
FMSIcon.SpeedLimit = ({
  value, size, color, className, falling, ...rest
}) => {
  const c = ["ui", size, color, !falling ? "circle outline" : "dont", "icon", className];
  return (
    <i className="fms-speed icons">
      <i className={c.join(" ")} />
      <span className="icon" >{value}</span>
    </i>
  );
};

export default FMSIcon;
