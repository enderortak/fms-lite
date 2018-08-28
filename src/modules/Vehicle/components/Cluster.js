import React from "react";
import propTypes from "prop-types";
import { RadialGauge } from "react-canvas-gauges";


// const lightTheme = {
//   highlights: [{ from: 110, to: 130, color: "rgba(0, 52, 120, .75)" }],
//   colorPlate: "#FFF",
//   colorMajorTicks: "#bbe0ec",
//   colorMinorTicks: "#9fbcc5",
//   colorTitle: "#fff",
//   colorUnits: "rgba(0, 52, 120, .75)",
//   colorNumbers: "rgba(0, 52, 120, .75)",
//   colorNeedleStart: "rgba(240, 128, 128, 1)",
//   colorNeedleEnd: "rgba(255, 160, 122, .9)",
//   colorNeedleShadowDown: "#333",
// };

const darkTheme = {
  highlights: [{ from: 110, to: 130, color: "rgba(200, 50, 50, 0.9)" }],
  colorPlate: "#767676",
  colorMajorTicks: "lightblue",
  colorMinorTicks: "rgba(255,255,255,0.7)",
  colorTitle: "rgba(255,255,255,0.9)",
  colorUnits: "rgba(255,255,255,0.9)",
  colorNumbers: "lightblue",
  colorNeedleStart: "rgba(240, 128, 128, 1)",
  colorNeedleEnd: "rgba(255, 160, 122, .9)",
  colorNeedleShadowDown: "#333",
};

const Cluster = ({ speed }) => (
  <div style={{
    position: "absolute",
    left: "calc(50% - 90px)",
    top: "-92px",
    height: "130px",
    overflow: "hidden",
    }}
  >
    <RadialGauge
      height={200}
      width={200}
      animateOnInit
      value={speed}
      minValue={0}
      maxValue={130}
      exactTicks
      majorTicks={[0, 10, 30, 50, 70, 90, 110, 130]}
      minorTicks={2}
      strokeTicks
      valueBox={false}
      fontNumbers="Grand National Super-Italic"
      animatedValue
      borders={false}
      borderShadowWidth={0}
      needleType="arrow"
      needleWidth={2}
      needleCircleSize={7}
      needleCircleOuter
      needleCircleInner={false}
      animationDuration={500}
      animationRule="linear"
      ticksAngle={210}
      startAngle={75}
      {...darkTheme}
    />
    <div style={{
      fontFamily: "Grand National Super-Italic",
      fontSize: "1.1em",
      position: "absolute",
      bottom: "-3px",
      width: "100%",
      textAlign: "center",
      color: "lightblue",
    }}
    >
      {Math.round(speed)} kph
    </div>
  </div>
);
Cluster.propTypes = {
  speed: propTypes.number.isRequired,
};
export default Cluster;
