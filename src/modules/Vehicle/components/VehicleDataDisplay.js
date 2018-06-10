import React from "react";
import { Header } from "semantic-ui-react";

const VehicleDataDisplay = ({ label, value }) => (
  <div style={{ display: "inline-block", marginRight: "2rem" }}>
    <Header sub>{label}</Header>
    <span>{value}</span>
  </div>
);

export default VehicleDataDisplay;
