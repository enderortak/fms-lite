import React from "react";
import propTypes from "prop-types";
import moment from "moment";
import ReactMomentPropTypes from "react-moment-proptypes";
import "moment/locale/tr";
import { Feed, Icon, Segment, Accordion, Table } from "semantic-ui-react";
import "./VehicleNotifications.scss";


const VehicleNotifications = ({ notifications }) => {
  moment.locale("tr");
  return (
    <Segment>
      <Feed id="vehicle-notification-feed">
        {
          notifications.map((i, ind) => <VehicleNotification icon={i.icon} date={i.date} text={i.text} key={ind} />)
        }
      </Feed>
    </Segment>
  );
};

VehicleNotifications.propTypes = {
  notifications: propTypes.arrayOf(propTypes.shape({ date: ReactMomentPropTypes.momentObj, text: propTypes.string.isRequired })).isRequired,
};

const VehicleNotification = ({ icon, date, text }) => (
  <Feed.Event>
    <Feed.Label>
      { icon && icon}
      { !icon && <Icon name="user" />}

    </Feed.Label>
    <Feed.Content>
      <Feed.Summary>
        <Accordion
          panels={[{
            title: <Accordion.Title><Icon name="dropdown" />{text}<Feed.Date>{date.fromNow()}</Feed.Date></Accordion.Title>,
            content: (
              <Accordion.Content>
                <Table definition size="small">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Tarih - Saat</Table.Cell>
                      <Table.Cell>{date.format("DD.MM.YYYY dddd, HH:mm")}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Konum</Table.Cell>
                      <Table.Cell>40.404040, 29.292929</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>

              </Accordion.Content>
            ),
          }]}
        />

      </Feed.Summary>
    </Feed.Content>
  </Feed.Event>
);

export default VehicleNotifications;
