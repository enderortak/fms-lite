import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";
import AuthService from "./../../service/AuthService";
import "./Login.scss";
import bg from "./bg.jpg";


export default class Login extends React.Component {
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
    if (this.Auth.loggedIn()) { this.props.history.replace("/"); }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then((result) => {
        if (this.Auth.loggedIn()) this.props.history.replace("/");
        else throw result;
      })
      .catch(error => this.setState({ error: error.code }));
  }
  render() {
    return (
      <div id="login-form" style={{ backgroundImage: `url("${bg}")` }} >
        <Grid textAlign="center" verticalAlign="middle" >
          <Grid.Column>
            <Header as="h2" color="blue" textAlign="center">
              <Icon name="sign in" />
              {" "}Hesabınıza giriş yapın
            </Header>
            <Form size="large">
              <Segment>
                <Form.Input
                  name="username"
                  type="text"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Kullanıcı Adı"
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="password"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  onChange={this.handleChange}
                />

                <Button color="blue" fluid size="large" onClick={this.handleFormSubmit}>Giriş</Button>
              </Segment>
            </Form>
            {
                this.state.error === 403 &&
                <Message error content="Girdiğiniz hesap bilgileri hatalı" icon="warning sign" />
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
