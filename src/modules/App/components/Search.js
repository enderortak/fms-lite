import React from "react";
import { Search } from "semantic-ui-react";
import _ from 'lodash';
import GeocodingService from "../../../service/GeocodingService";


const source = {
  microchip: {
    name: "microchip",
    results: [
      {
        title: "Robel, Streich and Schiller",
        description: "Decentralized upward-trending attitude",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/serefka/128.jpg",
        price: "$64.14",
      },
      {
        title: "Senger - Hammes",
        description: "Balanced asynchronous project",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/desastrozo/128.jpg",
        price: "$5.14",
      },
      {
        title: "Reynolds - Will",
        description: "Multi-lateral asynchronous interface",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/sangdth/128.jpg",
        price: "$60.06",
      },
      {
        title: "Kuhlman - Towne",
        description: "Team-oriented even-keeled process improvement",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/vikasvinfotech/128.jpg",
        price: "$67.53",
      },
      {
        title: "Hagenes Inc",
        description: "Organized coherent toolset",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg",
        price: "$24.05",
      },
    ],
  },
  pixel: {
    name: "pixel",
    results: [
      {
        title: "Shanahan - Nienow",
        description: "Multi-layered fresh-thinking conglomeration",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/juamperro/128.jpg",
        price: "$13.09",
      },
      {
        title: "Kulas - Schuppe",
        description: "Pre-emptive multi-tasking implementation",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/langate/128.jpg",
        price: "$16.90",
      },
      {
        title: "O'Kon, Pagac and Heidenreich",
        description: "Up-sized local capacity",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/gmourier/128.jpg",
        price: "$86.28",
      },
      {
        title: "O'Hara - Ritchie",
        description: "Quality-focused mobile intranet",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/ratbus/128.jpg",
        price: "$0.84",
      },
      {
        title: "Langworth Inc",
        description: "Expanded responsive portal",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/myastro/128.jpg",
        price: "$62.64",
      },
    ],
  },
  port: {
    name: "port",
    results: [
      {
        title: "Cormier, Stroman and Kulas",
        description: "Proactive executive protocol",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/shoaib253/128.jpg",
        price: "$73.99",
      },
      {
        title: "Durgan LLC",
        description: "Quality-focused human-resource support",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/chrisstumph/128.jpg",
        price: "$56.99",
      },
      {
        title: "Ryan - Mohr",
        description: "Extended multi-state solution",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        price: "$37.79",
      },
      {
        title: "Windler, O'Reilly and Mann",
        description: "Right-sized directional alliance",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/oskamaya/128.jpg",
        price: "$53.18",
      },
      {
        title: "Bogan, Rippin and Quigley",
        description: "Optimized dedicated concept",
        image: "https://s3.amazonaws.com/uifaces/faces/twitter/her_ruu/128.jpg",
        price: "$26.36",
      },
    ],
  },
};
export default class SearchComponent extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: "" })
  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = async (e, { value }) => {
      this.resetComponent();
      this.setState({ isLoading: true, value });

      setTimeout(() => {
        const geoService = new GeocodingService();
        geoService.search(value).then((mapResults) => {
          const filteredResults = this.searchStatic();
          const map = { name: "map" };
          map.results = mapResults.features.map(i => ({
            title: i.properties.name,
            description: "desc here",
            image: "https://s3.amazonaws.com/uifaces/faces/twitter/desastrozo/128.jpg",
            price: "",
          }));
          if (filteredResults) filteredResults.mapResults = map;
          console.log(filteredResults);
          this.setState({
            isLoading: false,
            results: filteredResults,
          });
        });
      }, 300);
    }
    searchStatic() {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      return _.reduce(source, (memo, data, name) => {
        const results = _.filter(data.results, isMatch);
        if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign

        return memo;
      }, {});
    }
    render() {
      const { isLoading, value, results } = this.state;
      console.log(this.state.results);
      return (<Search
        category
        loading={isLoading}
      // onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 3000, { leading: true })}
        results={results}
        value={value}
        {...this.props}
      />);
    }
}
