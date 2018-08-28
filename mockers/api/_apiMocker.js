const vehicles = require("./vehicles.js");
const { drivers } = require("./drivers.js");
const { auth } = require("./auth.js");
const reportData = require("./quickReportData");
const vehicleHistory = require("./vehicleHistory");

const proxy = {
  ...vehicles,
  ...auth,
  ...drivers,
  ...reportData,
  ...vehicleHistory,
};
module.exports = proxy;
