import React from "react";
import propTypes from "prop-types";
import Async from "react-promise";
import _ from "lodash";
import "./AsyncContent.scss";

Async.defaultPending = (
  <div className="loading-animated">Yükleniyor</div>
);

export default class AsyncContent extends React.Component {
  static propTypes = {
    promise: propTypes.func.isRequired,
    params: propTypes.object,
    then: propTypes.func.isRequired,
  }
  static defaultProps = { params: null }
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.params, nextProps.params);
  }
  render() {
    return <Async promise={this.props.promise(this.props.params)} then={this.props.then} />;
  }
}
