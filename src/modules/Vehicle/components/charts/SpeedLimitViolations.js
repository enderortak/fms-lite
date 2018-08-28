import React from "react";
import propTypes from "prop-types";
import Plot from "react-plotly.js";
import Async from "react-promise";
import { Segment, Loader } from "semantic-ui-react";
import ApiService from "./../../../../service/ApiService";
import LocalizationService from "../../../../service/LocalizationService";

const localizer = new LocalizationService("quickReports");

export default class SpeedLimitViolations extends React.Component {
  shouldComponentUpdate = () => false;
  render() {
    const reportApi = ApiService.report;
    return (
      <Async
        promise={reportApi.getSpeedLimitViolationsData()}
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
          x: data.dates,
          y: data.values,
          type: "scatter",
        mode: "lines",
        name: localizer.string("numberOfSpeedLimitViolations"),
        line: { color: "#17BECF" },
        },
      ]}
    layout={{
        height: 300,
        width: 400,
        margin: {
            t: 70, l: 30, r: 0, b: 30,
          },
        // title: "Time Series with Rangeslider",
        xaxis: {
          range: ["2018-06-01", "2018-07-01"],
          rangeselector: {
            buttons: [
                        {
                            count: 1,
                            label: `1${localizer.string("weekAbbr", "time")}`,
                            step: "week",
                            stepmode: "backward",
                        },
                        {
                            count: 1,
                            label: `1${localizer.string("monthAbbr", "time")}`,
                            step: "month",
                            stepmode: "backward",
                        },
                        { step: "all" },
                        ],
            },
          rangeslider: { range: ["2018-03-01", "2018-07-01"] },
          type: "date",
        },
        yaxis: {
          autorange: true,
          type: "linear",
        },
      }}
  />
);

Chart.propTypes = {
  data: propTypes.object.isRequired,
};

