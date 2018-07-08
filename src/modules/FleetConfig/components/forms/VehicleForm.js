import React from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import "./../../../../shared/style/forms.scss";
import ApiService from "../../../../service/ApiService";


export default class EditVehicle extends React.Component {
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
    apiService = new ApiService();

    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    handleChange = (e, { name, value }) => this.setState(state => ({ formData: { ...state.formData, [name]: value } }));
    handleSave = () => {
      this.setState({ processing: true });
      this.apiService
        .fetch("vehicles", this.mode === "create" ? "POST" : "PUT", this.state.formData)
        .then(() => {
          this.props.dispatch.fetchVehicles();
          this.setState({ processing: false });
          this.close();
        });
    };
    render() {
      const { moduleId, vin, plate } = this.state.formData;
      return (
        <Modal open={this.state.open} trigger={React.cloneElement(this.props.trigger, { onClick: this.open })} onClose={this.close}>
          <Modal.Header content="Araç Düzenleme" />
          <Modal.Content>
            <Form>
              <Form.Input label="VIN" placeholder="VIN" width={8} value={vin} name="vin" readOnly={this.mode === "edit"} />
              <Form.Input label="Modül ID" placeholder="Modül ID" width={8} name="moduleId" value={moduleId} onChange={this.handleChange} />
              <Form.Input label="Plaka" placeholder="Plaka" width={8} value={plate} name="plate" onChange={this.handleChange} />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary labelPosition="left" icon="remove" content="İptal" onClick={this.close} />
            <Button primary labelPosition="left" icon="save" content="Kaydet" onClick={this.handleSave} loading={this.state.processing} />
          </Modal.Actions>
        </Modal>
      );
    }
}
