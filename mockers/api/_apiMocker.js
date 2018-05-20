const vehicles = require("./vehicles.js");
const { auth } = require("./auth.js");

const proxy = {
  ...vehicles,
  ...auth,
};
module.exports = proxy;
