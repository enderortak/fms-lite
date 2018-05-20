const jwt = require('jsonwebtoken');

const testUsers = [
  {
    username: "ender",
    password: "1234",
    name: "Ender Ortak",
    vehicles: ["ford1", "ford2", "ford3"],
  },
  {
    username: "ender1",
    password: "4321",
    name: "Ender Ortak - 1",
    vehicles: ["ford4", "ford3", "ford2"],
  },
];


const auth = {
  "POST /api/login": (req, res) => {
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
};
module.exports = { auth, testUsers };

