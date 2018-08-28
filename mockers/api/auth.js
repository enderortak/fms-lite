const jwt = require("jsonwebtoken"); // eslint-disable-line
const apiSettings = require("./_apiMocker.Settings");

const testUsers = [
  {
    username: "ender",
    password: "1234",
    name: "Ender Ortak",
    appSettings: {
      language: "en",
    },
    vehicles: ["ford1", "ford2", "ford3", "ford5"],
  },
  {
    username: "ender1",
    password: "4321",
    appSettings: {
      language: "tr",
    },
    name: "Ender Ortak - 1",
    vehicles: ["ford4", "ford3", "ford2"],
  },
];


const auth = {
  "POST /api/signin": (req, res) => {
    const { password, username } = req.body;
    const queryResult = testUsers.filter(i => i.username === username && i.password === password);
    if (queryResult && queryResult.length > 0) {
      const user = queryResult[0];
      const token = jwt.sign(user, "my-test-api-secret");
      return res.json({ status: "ok", token });
    }
    return res.json({
      status: "error",
      code: 403,
    });
  },
  "PUT /api/account/:username": (req, res) => {
    setTimeout(() => {
      const queryResult = testUsers.filter(i => i.username === req.params.username);
      if (queryResult.length > 0) {
        queryResult[0] =
        Object.assign(queryResult[0], req.body);
        return res.json({ status: 'ok', code: "200", data: queryResult[0] });
      }
      return res.json({
        status: 'error',
        code: 403,
      });
    }, apiSettings.apiDelay);
  },
};
module.exports = { auth, testUsers };

