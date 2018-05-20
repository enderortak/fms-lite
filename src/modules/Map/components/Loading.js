import React from "react";
import propTypes from "prop-types";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading = ({ active }) =>
  (
    <Dimmer active={active} inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  );
Loading.propTypes = {
  active: propTypes.bool.isRequired,
};
export default Loading;

