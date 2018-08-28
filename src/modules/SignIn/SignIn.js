import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";
import AuthService from "./../../service/AuthService";
import "./SignIn.scss";
import bg from "./bg.jpg";
import LocalizationService from "../../service/LocalizationService";

const localizer = new LocalizationService("signIn");

export default class SignIn extends React.Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
  }
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
    this.state = { username: "", password: "", error: null };
  }
  componentWillMount() {
    if (this.Auth.signedIn()) { this.props.history.replace("/"); }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.signIn(this.state.username, this.state.password)
      .then((result) => {
        console.log(result);
        if (this.Auth.signedIn()) this.props.history.replace("/");
        else this.setState({ error: result.code });
      })
      .catch((error) => { console.log(error); this.setState({ error: error.code }); });
  }
  render() {
    return (
      <div id="signin-form" style={{ backgroundImage: `url("${bg}")` }} >
        <Grid textAlign="center" verticalAlign="middle" >
          <Grid.Column>
            <Header as="h2" color="blue" textAlign="center">
              <Icon name="sign in" />
              {` ${localizer.string("title")}`}
            </Header>
            <Form size="large">
              <Segment>
                <Form.Input
                  name="username"
                  type="text"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder={localizer.string("username")}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="password"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder={localizer.string("password")}
                  onChange={this.handleChange}
                />

                <Button color="blue" fluid size="large" onClick={this.handleFormSubmit}>{localizer.string("signIn")}</Button>
              </Segment>
            </Form>
            {
                this.state.error === 403 &&
                <Message error content={localizer.string("credentialsInvalid")} icon="warning sign" />
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
