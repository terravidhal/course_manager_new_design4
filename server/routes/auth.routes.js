const { login, logout } = require("../controllers/auth.controller");

module.exports = (app) => {
  app.post("/api/login", login);
  app.post("/api/logout", logout);
};
