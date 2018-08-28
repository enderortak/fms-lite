import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Search, Icon } from "semantic-ui-react";
import _ from 'lodash';
import GeocodingService from "../../service/GeocodingService";
import MapService from "../../service/MapService";
import "./Search.scss";
import { setSelectedVehicle, setSearchMarker, dismissSearchMarker } from "../Map/Map.Actions";
import { setSidePanelVisibility, setActiveSidePanelTab } from "../App/App.Actions";


class SearchComponent extends React.Component {
  static propTypes = {
    vehicles: propTypes.arrayOf(propTypes.object).isRequired,
    setSearchMarkerPosition: propTypes.func.isRequired,
    selectVehicle: propTypes.func.isRequired,
    showSidePanel: propTypes.func.isRequired,
    activateVehicleInfoTab: propTypes.func.isRequired,
    dismissSearchMarker: propTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.onSearchChange = _.debounce(this.handleSearchChange, 500, { leading: false, trailing: true });
  }
  componentWillMount() {
    this.resetComponent();
  }
  geoService = new GeocodingService();
  resetComponent = () => this.setState({ isLoading: false, results: [], value: "" })

  handleResultSelect = async (e, { result }) => {
    const map = new MapService();
    const { setSearchMarkerPosition } = this.props;
    await this.setState({ value: result.title });
    if (result.category === "map") {
      const geo = await this.geoService.geocode(result.locationid);
      setSearchMarkerPosition(result.title, [geo.location.latitude, geo.location.longitude]);
      map.setBounds([
        [geo.mapView.topLeft.latitude, geo.mapView.topLeft.longitude],
        [geo.mapView.bottomRight.latitude, geo.mapView.bottomRight.longitude],
      ]);
    } else if (result.category === "vehicle") {
      map.setView(result.latlon, 16);
      const { selectVehicle, showSidePanel, activateVehicleInfoTab } = this.props;
      selectVehicle(result.vin);
      showSidePanel(true);
      activateVehicleInfoTab();
    }
    // if (typeof this.props.onChange === "function") this.props.onChange();
  }

    handleSearchChange = async (e, { value }) => {
      // this.setState({ isLoading: true, value });
      const results = {};
      if (value.length < 1) {
        this.props.dismissSearchMarker();
        this.setState({
          isLoading: false,
          results,
        });
        return;
      }

      const { vehicles } = this.props;
      const highlightVehicleResults = (str, val) => {
        const regEx = new RegExp(val, "ig");
        const match = regEx.exec(str);
        return str.replace(match[0], `<b>${match[0]}<b>`);
      };
      const vehicleResults = await Promise.all(vehicles.filter(i =>
        i.vin.toLowerCase().includes(value.toLowerCase()) ||
              i.plate.toLowerCase().includes(value.toLowerCase()))
        .map(async i =>
          ({
            type: "map",
            category: "vehicle",
            icon: "truck",
            vin: i.vin,
            latlon: [i.lat, i.long],
            title: `${i.plate} (${i.vin})`,
            highlightedtitle: highlightVehicleResults(`${i.plate} (${i.vin})`, this.state.value),
            description: await this.geoService.reverseGeocode({ lat: i.lat, long: i.long }).then(k => k.level0),
            // onClick: () => { document.getElementById('app-search').focus(); },
          })));
      if (vehicleResults.length > 0) {
        results.vehicleResults = {
          name: "Araç",
          results: vehicleResults,
        };
      }


      const mapResults = await this.geoService.autocomplete(value, "here");
      if (mapResults.length > 0) {
        results.map = {
          name: "Harita",
          results: mapResults.map((i, ind) => ({
            key: ind,
            title: i.title,
            highlightedtitle: i.highlightedTitle,
            description: i.subtitle,
            locationid: i.locationId,
            type: "map",
            category: "map",
            icon: "map pin",
          })),
        };
      }

      this.setState({
        isLoading: false,
        results,
      });
    }
    resultRenderer = ({
      icon, price, title, highlightedtitle, description,
    }) => (
      <React.Fragment>
        {icon && (
        icon === "truck" ? <i className="ui big icon ui-icon-truck-front" style={{ float: "right" }} />
        : <Icon name={icon} size="big" style={{ float: "right" }} />)
      }
        <div key="content" className="content">
          {price && <div className="price">{price}</div>}
          {title && <div className="title">{this.highlight(highlightedtitle)}</div>}
          {description && <div className="description">{this.highlight(description)}</div>}
        </div>
      </React.Fragment>
    );
    highlight = (text) => {
      const t = text.split("<b>");
      return <div>{t[0]}<span>{t[1]}</span>{t[2]}</div>;
    }
    render() {
      const { isLoading, value, results } = this.state;
      return (<Search
        category
        fluid
        className="top panel"
        id="app-search"
        resultRenderer={this.resultRenderer}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={(e, data) => { this.setState({ isLoading: true, value: data.value }); this.onSearchChange(e, data); }}
        onKeyDown={(e) => { if (e.keyCode === 27) document.getElementById("app-search").blur(); }}
        results={results}
        value={value}
      />);
    }
}

const state2Props = state => ({
  vehicles: state.map.vehicles,
});
const dispatch2Props = dispatch => ({
  selectVehicle: vin => dispatch(setSelectedVehicle(vin)),
  showSidePanel: () => dispatch(setSidePanelVisibility(true)),
  activateVehicleInfoTab: () => dispatch(setActiveSidePanelTab(0)),
  setSearchMarkerPosition: (label, latLong) => dispatch(setSearchMarker(label, latLong)),
  dismissSearchMarker: () => dispatch(dismissSearchMarker()),
});

export default connect(state2Props, dispatch2Props)(SearchComponent);
