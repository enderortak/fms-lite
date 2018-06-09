import React from "react";

export default class ReactIcon extends React.Component {
  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({
        key: Math.floor(Math.random() * 100) + 1,
      }),
      1000,
    );
  }
  render() {
    return (this.props.children);
  }
}
