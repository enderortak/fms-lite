import React from "react";
import NotificationService from "./NotificationService";
import LocalizationService from "./LocalizationService";


const APP_API_URL = "http://localhost:3000/api";
const notifier = new NotificationService();
const localizer = new LocalizationService("api");


export const handledFetch = (url, options, issue) => {
  const time = Date.now();
  let _url = url;
  const _options = options;
  if (_options.method === "GET" && _options.body) {
    _url = `${url}?${convertToUrlParams(_options.body)}`;
    _options.body = undefined;
  }
  if (_options.body) _options.body = JSON.stringify(_options.body);
  return fetch(_url, { ..._options })
    .then(response => debugLog(_url, _options, response, time, issue))
    .then(handleHttpErrors)
    .then(getJson)
    .catch(handleCommErrors);
};

const debugLog = (url, options, response, time, issue) => {
  console.groupCollapsed(issue || "Request");
  console.log("url:", url);
  console.log("method:", options.method);
  console.log("options:", options);
  console.log("response:", response);
  console.log("elapsed time:", `${Date.now() - time} ms`);
  console.groupEnd();
  return response;
};

const handleHttpErrors = (response) => {
  if (!response.ok) {
    notifier.extended(
      localizer.string("httpError"),
      <p>{localizer.string("httpErrorDesc")}<br />{response.statusText}</p>,
      { type: "error" },
    );
    throw Error(response.statusText);
  }
  return response;
};

const handleCommErrors = (error) => {
  notifier.extended(
    localizer.string("commError"),
    <p>{localizer.string("commErrorDesc")}<br />{error.message}</p>,
    { type: "error" },
  );
  throw error;
};

const getJson = (response) => {
  if (response.headers.get("content-type").indexOf("application/json") !== -1) { // checking response header
    return response.json();
  }
  notifier.extended(localizer("unexpectedDataFormat"), "", { type: "error" });
  throw new TypeError(localizer("unexpectedDataFormat"));
};

const convertToUrlParams = params =>
  Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

export default class ApiService {
  static vehicle = {
    create: vehicle =>
      handledFetch(`${APP_API_URL}/vehicle`, { method: "POST", body: vehicle, headers: ApiService.requestHeaders }),
    update: vehicle =>
      handledFetch(`${APP_API_URL}/vehicle`, { method: "PUT", body: vehicle, headers: ApiService.requestHeaders }),
    getByUser: user =>
      handledFetch(`${APP_API_URL}/vehicle/${user}`, { method: "GET", headers: ApiService.requestHeaders }),
  }
  static report = {
    getDriverScore: driver =>
      handledFetch(`${APP_API_URL}/report/driverScore`, { body: { driver }, method: "GET", headers: ApiService.requestHeaders }),
    getEngTempData: vehicle =>
      handledFetch(`${APP_API_URL}/report/engTemp`, { body: { vehicle }, method: "GET", headers: ApiService.requestHeaders }),
    getSpeedLimitViolationsData: vehicle =>
      handledFetch(
        `${APP_API_URL}/report/speedLimitViolations`,
        { body: { vehicle }, method: "GET", headers: ApiService.requestHeaders },
      ),
    getSpeedTorqueData: vehicle =>
      handledFetch(`${APP_API_URL}/report/speedTorque`, { body: { vehicle }, method: "GET", headers: ApiService.requestHeaders }),
    getStateDistributionData: vehicle =>
      handledFetch(`${APP_API_URL}/report/stateDist`, { body: { vehicle }, method: "GET", headers: ApiService.requestHeaders }),
  }
  static history = {
    getByVehicle: vehicle =>
      handledFetch(`${APP_API_URL}/history/${vehicle}`, { method: "GET", headers: ApiService.requestHeaders }),
  }

  static auth = {
    signIn: (username, password) =>
      handledFetch(`${APP_API_URL}/signin`, { method: "POST", body: { username, password }, headers: ApiService.requestHeaders }),
  }
  static account = {
    update: account =>
      handledFetch(`${APP_API_URL}/account/ender`, { method: "PUT", body: account, headers: ApiService.requestHeaders }),
  }
  static requestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: this.auth.loggedIn() ? `Bearer ${this.auth.getToken()}` : undefined,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "*",
    // "Access-Control-Allow-Methods": "*",
  };
}
