import React from "react";
import AuthService from "./AuthService";
import NotificationService from "./NotificationService";

const APP_API_URL = "http://localhost:3000/api";

export default class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl || APP_API_URL;
    this.auth = new AuthService();
    this.notify = new NotificationService();
  }
  fetch(apiMethod, httpMethod, requestBody) {
    let requestUrl = `${this.apiUrl}/${apiMethod}`;
    if (httpMethod === "GET" && requestBody) requestUrl += `?${this.convertToUrlParams(requestBody)}`;
    console.log("fetching data from ", requestUrl, " method: ", httpMethod);
    const requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: this.auth.loggedIn() ? `Bearer ${this.auth.getToken()}` : undefined,
      "Access-Control-Allow-Origin": "*",
    };
    const requestOptions = {
      headers: requestHeaders,
      method: httpMethod,
      body: httpMethod === "GET" ? undefined : JSON.stringify(requestBody),
    };
    return fetch(requestUrl, requestOptions)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then((response) => {
        if (response.headers.get("content-type").indexOf("application/json") !== -1) { // checking response header
          return response.json();
        }
        throw new TypeError("Sunucudan gelen veri beklenmeyen bir formatta");
      })
      .catch((error) => {
        this.notify.extended(
          "Sunucu erişim hatası",
          <p>Sunucu ile iletişime geçerken bir hata oluştu: <br />
            {error.message}
          </p>,
          { type: "error" },
        );
        throw error;
      });
  }
  convertToUrlParams(params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
  }
}
