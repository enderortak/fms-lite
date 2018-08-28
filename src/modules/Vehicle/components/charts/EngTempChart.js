import React from "react";
import propTypes from "prop-types";
import { BarChart, Bar, XAxis, LabelList, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import Async from "react-promise";
import { Segment, Loader } from "semantic-ui-react";
import ApiService from "./../../../../service/ApiService";
import style from "./../../../../shared/style/base";
import LocalizationService from "../../../../service/LocalizationService";

const reportApi = ApiService.report;
const localizer = new LocalizationService("quickReports");

export default class EngTempChart extends React.Component {
  shouldComponentUpdate = () => false;
  render() {
    return (
      <Async
        promise={reportApi.getEngTempData()}
        then={data => <Chart data={data} />}
        pending={<Segment style={{ height: "350px" }}><Loader active /></Segment>}
      />
    );
  }
}

const Chart = ({ data }) => (
  <Segment>
    <BarChart
      width={400}
      height={350}
      data={data}
      barCategoryGap={0}
      margin={{
    top: 20, right: 5, left: 5, bottom: 5,
    }}
    >
      <ReferenceLine />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={50} />
      <Tooltip />
      <Bar
        dataKey="occ"
        fill={style.color.$bgColorBlueLighter}
        stroke={style.color.bgColorBlue}
        name={localizer.string("numberOfNotifications")}
      >
        <LabelList dataKey="occ" position="top" />
      </Bar>
    </BarChart>
  </Segment>
);
Chart.propTypes = {
  data: propTypes.object.isRequired,
};

