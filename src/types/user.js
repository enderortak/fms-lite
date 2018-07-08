import propTypes from "prop-types";

const user = propTypes.shape({
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  vehicles: propTypes.arrayOf(propTypes.string),
});

export default user;
