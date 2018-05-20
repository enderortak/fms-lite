import React from "react";
import { Search } from "semantic-ui-react";

export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, results: [], value: "",
    };
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: "" })
  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      const filteredResults = _.reduce(source, (memo, data, name) => {
        const results = _.filter(data.results, isMatch);
        if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign

        return memo;
      }, {});

      this.setState({
        isLoading: false,
        results: filteredResults,
      });
    }, 300);
  }
  render() {
    const { isLoading, value, results } = this.state;
    return (<Search
      category
      loading={isLoading}
      // onResultSelect={this.handleResultSelect}
      onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
      results={results}
      value={value}
      {...this.props}
    />);
  }
}
