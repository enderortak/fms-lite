import React from "react";
import propTypes from "prop-types";
import { Search, Icon } from "semantic-ui-react";
import _ from 'lodash';
import GeocodingService from "../../service/GeocodingService";
import MapService from "../../service/MapService";
import "./Search.scss";


export default class SearchComponent extends React.Component {
  static propTypes = {
    dispatch: propTypes.object.isRequired,
    state: propTypes.object.isRequired,
  }
  componentWillMount() {
    this.resetComponent();
  }
  geoService = new GeocodingService();
  resetComponent = () => this.setState({ isLoading: false, results: [], value: "" })

  handleResultSelect = async (e, { result }) => {
    const { dispatch } = this.props;
    const map = new MapService();
    console.log("Search selection changed: ", result.title);
    await this.setState({ value: result.title });
    if (result.category === "map") {
      const geo = await this.geoService.geocode(result.description);
      console.log("Map will center to this position: ", geo.marker[1], ", ", geo.marker[0]);
      dispatch.setSearchMarker(result.title, [geo.marker[1], geo.marker[0]]);
      map.setBounds([geo.bounds.corner1, geo.bounds.corner2]);
    } else if (result.category === "vehicle") {
      console.log("Vehicle selected (", result.vin, "), centering the map to ", result.latlon);

      map.setView(result.latlon, 16);
      dispatch.setSelectedVehicle(result.vin);
      dispatch.setSidePanelVisibility(true);
      dispatch.setActiveSidePanelTab(0);
    }
    // if (typeof this.props.onChange === "function") this.props.onChange();
  }

    handleSearchChange = async (e, { value }) => {
      this.setState({ isLoading: true, value });
      if (value.length < 1) {
        this.props.dispatch.dismissSearchMarker();
      }
      const results = {},
        { vehicles } = this.props.state.map;

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
            description: await this.geoService.reverse(i.lat, i.long).then(k => k.district),
            // onClick: () => { document.getElementById('app-search').focus(); },
          })));
      if (vehicleResults.length > 0) {
        results.vehicleResults = {
          name: "Araç",
          results: vehicleResults,
        };
      }

      const mapResults = await this.geoService.autocomplete(value, "yandex");
      if (mapResults.length > 0) {
        results.map = {
          name: "Harita",
          results: mapResults.map((i, ind) => ({
            key: ind, title: i.name.split(",")[0], description: i.meta, type: "map", category: "map", icon: "map pin",
          })),
        };
      }

      this.setState({
        isLoading: false,
        results,
      });
    }
    resultRenderer = ({
      icon, price, title, description,
    }) => (
      <React.Fragment>
        {icon && (
        icon === "truck" ? <i className="ui big icon ui-icon-truck-front" style={{ float: "right" }} />
        : <Icon name={icon} size="big" style={{ float: "right" }} />)
      }
        <div key="content" className="content">
          {price && <div className="price">{price}</div>}
          {title && <div className="title">{title}</div>}
          {description && <div className="description">{description}</div>}
        </div>
      </React.Fragment>
    );
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
        onSearchChange={_.debounce(this.handleSearchChange, 3000, { leading: true })}
        results={results}
        value={value}
      />);
    }
}
