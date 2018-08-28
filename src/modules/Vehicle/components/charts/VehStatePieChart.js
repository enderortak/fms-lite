import React from "react";
import propTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Async from "react-promise";
import { Segment, Loader } from "semantic-ui-react";
import moment from "moment";
import ApiService from "./../../../../service/ApiService";
import LocalizationService from "../../../../service/LocalizationService";

const reportApi = ApiService.report;
const localizer = new LocalizationService("quickReports");

export default class VehStatePieChart extends React.Component {
  shouldComponentUpdate = () => false;
  render() {
    return (
      <Async
        promise={reportApi.getStateDistributionData()}
        then={data => <Chart data={data.map(i => ({ ...i, name: localizer.string(i.name) }))} />}
        pending={<Segment style={{ height: "350px" }}><Loader active /></Segment>}
      />
    );
  }
}


const COLORS = ['blue', 'orange', 'red'];
const CustomizedLabel = ({
  cx, cy, midAngle, outerRadius, value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + (radius * Math.cos(-midAngle * RADIAN));
  const y = cy + (radius * Math.sin(-midAngle * RADIAN));
  return (
    <text
      textAnchor={x > cx ? 'start' : 'end'}
      x={x}
      y={y}
      dy={-4}
    >
      {moment.duration(value).asHours() > 1 ? `${Math.floor(moment.duration(value).asHours())} s ` : "" }
      {Math.round(moment.duration(value).minutes())} dk
    </text>
  );
};
CustomizedLabel.propTypes = {
  cx: propTypes.number.isRequired,
  cy: propTypes.number.isRequired,
  midAngle: propTypes.number.isRequired,
  outerRadius: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
};
const Chart = ({ data }) => (
  <Segment>
    <PieChart width={400} height={350}>
      <Pie data={data} innerRadius={40} outerRadius={80} fill="#82ca9d" label={CustomizedLabel}>
        {data.map((entry, index) => <Cell fill={COLORS[index]} />)}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  </Segment>
);

Chart.propTypes = {
  data: propTypes.object.isRequired,
};

