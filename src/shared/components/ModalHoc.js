import React from "react";
import propTypes from "prop-types";

const withModal = (Component) => {
  const ModalWrappedComponent = ({ modal: Modal, ...rest }) => <Modal trigger={<Component {...rest} />} />;
  ModalWrappedComponent.propTypes = { modal: propTypes.func.isRequired };
  return ModalWrappedComponent;
};

export default withModal;
