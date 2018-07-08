const { testUsers } = require("./auth");
const apiSettings = require("./_apiMocker.Settings");

const vehicles = [
  {
    vin: "ford1_vin",
    moduleId: "ford1",
    plate: "34 TEST 01",
    lat: 40.973980,
    long: 29.232574,
    speed: 58,
    lastPositionUpdate: "20180522161115",
  },
  {
    vin: "ford2_vin",
    moduleId: "ford2",
    plate: "34 TEST 02",
    lat: 40.975243,
    long: 29.233703,
    speed: 0,
    lastPositionUpdate: "20180522160115",
  },
  {
    vin: "ford3_vin",
    moduleId: "ford3",
    plate: "34 TEST 03",
    lat: 40.975243,
    long: 29.234203,
    speed: 0,
    lastPositionUpdate: "20180522155415",
  },
  {
    vin: "ford4_vin",
    moduleId: "ford4",
    plate: "34 TEST 04",
    lat: 40.975243,
    long: 29.234703,
    speed: 0,
    lastPositionUpdate: "20180522154315",
  },
  {
    vin: "ford5_vin",
    moduleId: "ford5",
    plate: "34 TEST 05",
    lat: 40.975243,
    long: 29.134703,
    speed: 68,
    lastPositionUpdate: "20180522155848",
  },
];

const proxy = {
  'GET /api/vehicles/:username': (req, res) => {
    setTimeout(() => res.json(vehicles.filter(v =>
      testUsers.filter(i => i.username === req.params.username)[0].vehicles.includes(v.moduleId))), apiSettings.apiDelay);
  },
  "PUT /api/vehicles": (req, res) => {
    setTimeout(() => {
      if (vehicles.filter(i => i.vin === req.body.vin).length > 0) {
        vehicles.filter(i => i.vin === req.body.vin)[0] =
        Object.assign(vehicles.filter(i => i.vin === req.body.vin)[0], req.body);
        return res.json({ status: 'ok', code: "200" });
      }
      return res.json({
        status: 'error',
        code: 403,
      });
    }, apiSettings.apiDelay);
  },
};
module.exports = proxy;
