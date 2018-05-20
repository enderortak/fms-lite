import React from "react";
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";

import logo from "./logo.svg";
import bg from "./bg.jpg";
import "./Login.scss";

import AuthService from "./../../service/AuthService";

export default class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
    this.state = { username: "", password: "", error: null };
  }
  componentWillMount() {
    if (this.Auth.loggedIn()) { this.props.history.replace('/'); }
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
        if (this.Auth.loggedIn()) this.props.history.replace('/');
        else throw result;
      })
      .catch(error => this.setState({ error: error.code }));
  }
  render() {
    return (
      <div
        id="login-form"
        style={{
 height: "100%", padding: "10rem", background: `url('${bg}') no-repeat center center fixed`, backgroundSize: "cover",
}}
      >
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
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
                <Message error content="Girdiğiniz hesap bilgileri hatalı" icon="warning sign" style={{ opacity: "0.9" }} />
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
