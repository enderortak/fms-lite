import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Modal, Button } from "semantic-ui-react";
import LocalizationService from "../../service/LocalizationService";
import ApiService from "./../../service/ApiService";
import { setLanguage } from "../App/App.Actions";

const accountApi = ApiService.account;
const localizer = new LocalizationService("applicationSettings");

class AppSettings extends React.Component {
    static propTypes = {
      trigger: propTypes.element.isRequired,
      language: propTypes.string.isRequired,
      setLanguage: propTypes.func.isRequired,
    };
    state = {
      formData: {
        appLang: this.props.language,
      },
      processing: false,
    }
    handleRef = (modal) => { this.modal = modal; }
    handleClose = () => this.modal.handleClose();
    handleChange = (e, { name, value }) => this.setState(state => ({ formData: { ...state.formData, [name]: value } }));
    handleSave = () => {
      this.setState({ processing: true });
      accountApi.update({ appSettings: { language: this.state.formData.appLang } })
        .then((result) => {
          this.setState({ processing: false });
          this.handleClose();
          this.props.setLanguage(result.data.appSettings.language);
          this.props.history.replace('/signin');
        });
    };
    render() {
      const { trigger } = this.props;
      return (
        <Modal
            // size="fullscreen"
          loading={this.state.processing}
          trigger={trigger}
          closeIcon
          onClick={(e) => { e.stopPropagation(); }}
          ref={this.handleRef}
        >
          <Modal.Header>{localizer.string("title")}</Modal.Header>
          <Modal.Content>
            <Form >
              <Form.Dropdown
                label={localizer.string("appLang")}
                width={8}
                name="appLang"
                selection
                value={this.state.appLang}
                onChange={this.handleChange}
                options={[
                    {
                    key: 'en', value: 'en', flag: 'gb', text: 'English',
                    },
                    {
                    key: 'tr', value: 'tr', flag: 'tr', text: 'Türkçe',
                    },
                  ]}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              secondary
              labelPosition="left"
              icon="remove"
              content={localizer.string("cancel")}
              onClick={this.handleClose}
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

const state2Props = state => ({
  language: state.app.language,
});
const dispatch2Props = dispatch => ({
  setLanguage: language => dispatch(setLanguage(language)),
});

export default withRouter(connect(state2Props, dispatch2Props)(AppSettings));
