import React from "react";
import propTypes from "prop-types";
import Plot from "react-plotly.js";
import Async from "react-promise";
import { Segment, Loader } from "semantic-ui-react";
import ApiService from "./../../../../service/ApiService";

export default class SpeedTorqueHeatMap extends React.Component {
  shouldComponentUpdate = () => false;
  render() {
    const reportApi = ApiService.report;
    return (
      <Async
        promise={reportApi.getSpeedTorqueData()}
        then={data => <Chart data={data} />}
        pending={<Segment style={{ height: "350px" }}><Loader active /></Segment>}
      />
    );
  }
}
const Chart = ({ data }) => (
  <Plot
    data={[
    {
      mode: "markers",
      y: data.torqueTrace,
      x: data.speedTrace,
      type: "scatter",
      name: "points",
      marker: {
        color: "rgb(102,0,0)",
        opacity: 0.4,
        size: 2,
      },
    },
    {
      y: data.torqueTrace,
      x: data.speedTrace,
      type: "histogram2dcontour",
      name: "density",
      colorscale: "Hot",
      reversescale: true,
      ncontours: 20,
      showscale: false,
    },
    {
      x: data.speedTrace,
      type: "histogram",
      yaxis: "y2",
      marker: { color: "rgb(102,0,0)" },
      name: "x density",
    },
    {
      y: data.torqueTrace,
      type: "histogram",
      xaxis: "x2",
      marker: { color: "rgb(102,0,0)" },
      name: "y density",
    },
  ]}
    layout={{
    autosize: false,
    yaxis: {
      zeroline: false,
      showgrid: false,
      domain: [
        0,
        0.85,
      ],
    },
    xaxis2: {
      zeroline: false,
      domain: [
        0.85,
        1,
      ],
      showgrid: false,
      visible: false,
    },
    height: 300,
    width: 400,
    yaxis2: {
      zeroline: false,
      domain: [
        0.85,
        1,
      ],
      showgrid: false,
      visible: false,
    },
    bargap: 0,
    xaxis: {
      zeroline: false,
      domain: [
        0,
        0.85,
      ],
      showgrid: false,
    },
    hovermode: "closest",
    showlegend: false,
    margin: {
 t: 70, l: 40, r: 0, b: 30,
},
  }}
  />
);

Chart.propTypes = {
  data: propTypes.object.isRequired,
};

