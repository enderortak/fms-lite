const { testUsers } = require("./auth");

const vehicles = [
  {
    vehicleId: "ford1",
    plate: "34 TEST 01",
    vin: "ford1_vin",
    lat: 40.973980,
    long: 29.232574,
    speed: 58,
  },
  {
    vehicleId: "ford2",
    plate: "34 TEST 02",
    vin: "ford2_vin",
    lat: 40.975243,
    long: 29.233703,
    speed: 0,
  },
  {
    vehicleId: "ford3",
    plate: "34 TEST 03",
    vin: "ford3_vin",
    lat: 40.975243,
    long: 29.234203,
    speed: 0,
  },
  {
    vehicleId: "ford4",
    plate: "34 TEST 04",
    vin: "ford4_vin",
    lat: 40.975243,
    long: 29.234703,
    speed: 0,
  },
];

const proxy = {
  'GET /api/vehicles/:username': (req, res) =>
    res.json(vehicles.filter(v =>
      testUsers.filter(i => i.username === req.params.username)[0].vehicles.includes(v.vehicleId))),
};
module.exports = proxy;
