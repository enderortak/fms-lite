import React from "react";
import propTypes from "prop-types";
import { Modal, Form, Button } from "semantic-ui-react";
import "./../../../../shared/style/forms.scss";
import ApiService from "../../../../service/ApiService";
import LocalizationService from "../../../../service/LocalizationService";

const vehicleApi = ApiService.vehicle;
const localizer = new LocalizationService("fleetConfig");

export default class VehicleForm extends React.Component {
  static propTypes = {
    trigger: propTypes.element.isRequired,
    fetchVehicles: propTypes.func.isRequired,
    item: propTypes.object,
  }
  static defaultProps = {
    item: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      processing: false,
      formData: this.setInitialFormData(),
    };
    this.mode = this.props.item ? "edit" : "create";
  }

    setInitialFormData = () => {
      const { item: vehicle } = this.props;
      if (vehicle) {
        const { moduleId, vin, plate } = vehicle;
        return { moduleId, vin, plate };
      }
      return {};
    }


    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    handleChange = (e, { name, value }) => this.setState(state => ({ formData: { ...state.formData, [name]: value } }));
    handleSave = () => {
      this.setState({ processing: true });
      const request = this.mode === "create" ? vehicleApi.create : vehicleApi.update;
      request(this.state.formData)
        .then(() => {
          this.props.fetchVehicles();
          this.setState({ processing: false });
          this.close();
        });
    };
    render() {
      const { moduleId, vin, plate } = this.state.formData;
      return (
        <Modal
          open={this.state.open}
          trigger={React.cloneElement(this.props.trigger, { onClick: this.open })}
          onClose={this.close}
        >
          <Modal.Header content={localizer.string(`${this.mode === "create" ? "add" : "edit"}VehicleTitle`)} />
          <Modal.Content>
            <Form>
              <Form.Input label="VIN" placeholder="VIN" width={8} value={vin} name="vin" readOnly={this.mode === "edit"} />
              <Form.Input
                label={localizer.string("moduleId")}
                placeholder={localizer.string("moduleId")}
                width={8}
                name="moduleId"
                value={moduleId}
                onChange={this.handleChange}
              />
              <Form.Input
                label={localizer.string("plate")}
                placeholder={localizer.string("plate")}
                width={8}
                value={plate}
                name="plate"
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              secondary
              labelPosition="left"
              icon="remove"
              content={localizer.string("cancel")}
              onClick={this.close}
            />
            <Button
              primary
              labelPosition="left"
              icon="save"
              content={localizer.string("save")}
              onClick={this.handleSave}
              loading={this.state.processing}
            />
          </Modal.Actions>
        </Modal>
      );
    }
}
