const vehicles = require("./vehicles.js");
const drivers = require("./drivers.js");
const { auth } = require("./auth.js");

const proxy = {
  ...vehicles,
  ...auth,
  ...drivers,
};
module.exports = proxy;
