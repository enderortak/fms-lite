
import React from "react";
import propTypes from "prop-types";
import moment from "moment";
import { Segment, Tab } from "semantic-ui-react";
import GeocodingService from "../../service/GeocodingService";
import VehicleStatus from "./components/VehicleStatus";
import VehicleNotifications from "./components/VehicleNotifications";
import FMSIcon from "./../../shared/components/FMSIcon";
import ComingSoon from "./../../shared/components/ComingSoon";

const geocoder = new GeocodingService();


export default class VehicleSidePanelDisplay extends React.Component {
  static propTypes = {
    vehicle: propTypes.object,
  }
  static defaultProps = {
    vehicle: null,
  }
  constructor(props) {
    super(props);
    this.state = { street: "", district: "" };
    this.panes = this.panes.bind(this);
  }

  componentDidMount() {
    if (this.props.vehicle) {
      geocoder.reverse(this.props.vehicle.lat, this.props.vehicle.long)
        .then(result => this.setState({ street: result.street, district: result.district }));
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.vehicle &&
        (!prevProps.vehicle || prevProps.vehicle.vin !== this.props.vehicle.vin)
    ) {
      this.setState({ street: "", district: "" }); // eslint-disable-line
      geocoder.reverse(this.props.vehicle.lat, this.props.vehicle.long)
        .then(result => this.setState({ street: result.street, district: result.district }));
    }
  }

  panes() {
    const { vehicle } = this.props;
    return [
      {
        menuItem: "Durum",
        render: () => (
          <Tab.Pane
            attached={false}
            as={VehicleStatus}
            vin={vehicle.vin}
            plate={vehicle.plate}
            speed={vehicle.speed}
            lat={vehicle.lat}
            long={vehicle.long}
            street={this.state.street}
            district={this.state.district}
            lastcomm={moment(vehicle.lastPositionUpdate, "YYYYMMDDHHmmss").format("DD.MM.YYYY HH:mm")}
          />
        ),
      },
      {
        menuItem: "Bildirimler",
        render: () => <Tab.Pane as={VehicleNotifications} attached={false} notifications={notifications} />,
      },
      { menuItem: "Geçmiş", render: () => <Tab.Pane attached={false}><ComingSoon /></Tab.Pane> },
      { menuItem: "Hızlı Raporlar", render: () => <Tab.Pane attached={false}><ComingSoon /></Tab.Pane> },
      { menuItem: "Ayarlar", render: () => <Tab.Pane attached={false}><ComingSoon /></Tab.Pane> },
    ];
  }
  render() {
    const { vehicle } = this.props;
    return (
      <React.Fragment>
        {!vehicle && <Segment>Seçili araç yok</Segment>}
        {vehicle &&
          <Tab
            as={React.Fragment}
            menu={{ secondary: true, pointing: true, style: { marginBottom: "0" } }}
            panes={this.panes()}
          />
        }
      </React.Fragment>
    );
  }
}

const notifications = [
  {
    date: moment().subtract(3, "hours"),
    text: "Kontak açıldı",
    icon: <FMSIcon name="key-on" color="black" />,
  },
  {
    date: moment().subtract(3, "hours").add(3, "minutes"),
    text: "Araç harekete geçti",
    icon: <FMSIcon name="flag-o" color="black" />,
  },
  {
    date: moment().subtract(3, "hours").add(15, "minutes"),
    text: "GPS bağlantısı kesildi",
    icon: <FMSIcon name="no-gps" color="black" />,
  },
  {
    date: moment().subtract(3, "hours").add(17, "minutes"),
    text: "GPS bağlantısı sağlandı",
    icon: <FMSIcon name="gps" color="black" />,
  },
  {
    date: moment().subtract(2, "hours"),
    text: "Hız limiti aşıldı",
    icon: <FMSIcon.SpeedLimit value="130" color="red" size="large" />,
  },
  {
    date: moment().subtract(2, "hours").add(3, "minutes"),
    text: "Hız limiti aşımı sona erdi",
    icon: <FMSIcon.SpeedLimit value="130" color="red" size="large" falling />,
  },
  {
    date: moment().subtract(2, "hours").add(15, "minutes"),
    text: "GPS bağlantısı kesildi",
    icon: <FMSIcon name="no-gps" color="black" />,
  },
  {
    date: moment().subtract(2, "hours").add(17, "minutes"),
    text: "GPS bağlantısı sağlandı",
    icon: <FMSIcon name="gps" color="black" />,
  },
  {
    date: moment().subtract(2, "hours").add(35, "minutes"),
    text: "Araç durdu",
    icon: <FMSIcon name="flag-o-dont" color="black" />,
  },
  {
    date: moment().subtract(2, "hours").add(40, "minutes"),
    text: "Araç harekete geçti",
    icon: <FMSIcon name="flag-o" color="black" />,
  },
  {
    date: moment().subtract(1, "hours").add(5, "minutes"),
    text: "Araç durdu",
    icon: <FMSIcon name="flag-o-dont" color="black" />,
  },
  {
    date: moment().subtract(1, "hours").add(6, "minutes"),
    text: "Kontak kapandı",
    icon: <FMSIcon name="key-off" color="black" />,
  },
].reverse();
