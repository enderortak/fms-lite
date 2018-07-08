import React from "react";
import propTypes from "prop-types";

export default class ReactIcon extends React.Component {
  static propTypes = {
    children: propTypes.node,
  }
  static defaultProps = { children: null }
  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({
        key: Math.floor(Math.random() * 100) + 1, // eslint-disable-line
      }),
      1000,
    );
  }
  render() {
    return (this.props.children);
  }
}
