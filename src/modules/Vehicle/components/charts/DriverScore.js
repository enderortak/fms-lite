import React from "react";
import propTypes from "prop-types";
import CircularProgressbar from "react-circular-progressbar";
import { Segment, Message, Icon, Loader, Header } from "semantic-ui-react";
import Plot from "react-plotly.js";
import Async from "react-promise";
import "react-circular-progressbar/dist/styles.css";
import ApiService from "./../../../../service/ApiService";
import LocalizationService from "../../../../service/LocalizationService";

const reportApi = ApiService.report;
const localizer = new LocalizationService("quickReports");

export default class DriverScore extends React.Component {
  static propTypes = {
    driver: propTypes.string.isRequired,
  }
  shouldComponentUpdate = () => false;
  render() {
    return (
      <Async
        promise={reportApi.getDriverScore()}
        then={data => <Chart data={data} driver={this.props.driver} />}
        pending={<Segment style={{ height: "350px" }}><Loader active /></Segment>}
      />
    );
  }
}

const Chart = ({ data, driver }) => (
  <React.Fragment>
    <Message icon>
      <Icon name="user" />
      <Message.Content>
        <Message.Header>{driver}</Message.Header>
      </Message.Content>
      <div style={{ display: "inline-block", width: "20%" }}>
        <CircularProgressbar
          percentage={data.overall}
          text={`${data.overall}/100`}
        />
      </div>
    </Message>
    <Segment>
      <Header as="h4" content={localizer.string("pointDistribution")} />
      <Plot
        data={[{
            type: "scatterpolar",
            r: [data.acceleration, data.cruising, data.braking, data.anticipation, data.acceleration],
            theta: [
              localizer.string("acceleration"),
              localizer.string("cruising"),
              localizer.string("braking"),
              localizer.string("anticipation"),
              localizer.string("acceleration"),
            ],
            hoverInfo: "r+theta+text",
            fill: "toself",
            name: localizer.string("pointDistribution"),
            mode: 'lines+markers+text',
            text: [data.acceleration, data.cruising, data.braking, data.anticipation],
            textposition: 'top',
          }]}
        layout={{
            polar: {
              radialaxis: {
                visible: true,
                range: [20, 100],
              },
            },
            height: 250,
            width: 400,
            margin: {
              t: 30, l: 100, r: 100, b: 30,
            },
            showlegend: false,
          }}
      />
    </Segment>
  </React.Fragment>
);

Chart.propTypes = {
  data: propTypes.object.isRequired,
  driver: propTypes.string.isRequired,
};

