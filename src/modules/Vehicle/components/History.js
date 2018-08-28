import React from "react";
import propTypes from "prop-types";
import moment from "moment";
import "moment/locale/tr";
import Async from "react-promise";
import { Loader, Segment, Button } from "semantic-ui-react";

import ApiService from "./../../../service/ApiService";
import DataGrid from "./../../../shared/components/DataGrid";
import LocalizationService from "../../../service/LocalizationService";

const localizer = new LocalizationService("vehicleHistory");
const numberOfPositionData = 1000;
const historyApi = ApiService.history;

const History = ({ hideSidePanel, enterPlaybackMode }) => {
  moment.locale("tr");
  return (
    <Async
      promise={historyApi.getByVehicle("ford5_vin")}
      then={data => (
        <div style={{ flex: "1", overflow: "auto", padding: "1em" }}>
          <Button
            icon="play"
            labelPosition="left"
            content={localizer.string("vehicleHistoryPlayback")}
            floated="right"
            style={{ margin: "0.5em" }}
            onClick={() => {
              hideSidePanel();

            enterPlaybackMode(data.slice(0, numberOfPositionData));
            }}
          />
          <DataGrid
            columnTitles={{
                dateTime: localizer.string("date"),
                type: localizer.string("packageType"),
                lat: localizer.string("latitude"),
                long: localizer.string("longitude"),
                speed: localizer.string("speed"),
            }}
            dataFormatting={{ dateTime: v => moment(v, "YYYYMMDDHHmmss").format("DD.MM.YYYY HH:mm") }}
            data={data.map((i) => {
            const {
                    dateTime, type, lat, long, speed,
                  } = i;
            return {
                      dateTime, type, lat, long, speed,
                   };
            })}
          />
        </div>
                    )}
      pending={<Segment style={{ height: "350px" }}><Loader active /></Segment>}
    />

  );
};

History.propTypes = {
  hideSidePanel: propTypes.func.isRequired,
  enterPlaybackMode: propTypes.func.isRequired,
};


export default History;
