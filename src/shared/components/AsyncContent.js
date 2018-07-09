import React from "react";

export default class AsyncContent extends React.Component {
  state = {
    content: null,
  }
  render() {
    return this.props.children;
  }
}
