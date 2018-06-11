import React from "react";
import { Header } from "semantic-ui-react";

const VehicleDataDisplay = ({ label, value, inverted }) => (
  <div style={{ display: "inline-block", marginRight: "2rem" }}>
    <Header sub inverted={inverted}>{label}</Header>
    <span>{value}</span>
  </div>
);

export default VehicleDataDisplay;
