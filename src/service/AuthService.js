import React from "react";
import decode from "jwt-decode";
import ApiService from "./ApiService";

export default class AuthService {
  // Initializing important variables
  constructor() {
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    const api = new ApiService();
    return api.fetch("login", "POST", {
      username,
      password,
    }).then((result) => {
      if (result.token) this.setToken(result.token); // Setting the token in localStorage
      return result;
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    // try {
    //   const decoded = decode(token);
    //   if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
    //     return true;
    //   }
    //   return false;
    // } catch (err) {
    //   return false;
    // }
    return false;
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
    // return { username: "ender" };
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export const requireAuth = (AuthComponent) => {
  const Auth = new AuthService();
  return class AuthWrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
      };
    }
    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
        return false;
      }
      try {
        const profile = Auth.getProfile();
        this.setState({
          user: profile,
        });
        return true;
        // alert(`I am logged in as ${profile.username}. I can be rendered now.`);
      } catch (err) {
        // alert("Invalid session. I will logout now.");
        Auth.logout();
        this.props.history.replace('/login');
        return false;
      }
    }
    render() {
      if (this.state.user) {
        return (
          <AuthComponent user={this.state.user} {...this.props} />
        );
      }

      return null;
    }
  };
};
