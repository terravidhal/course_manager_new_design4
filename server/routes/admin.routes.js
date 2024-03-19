const { register,
        findOneSingleAdmin,
        updateExistingAdmin,
        updateExistingAdminPassword,
      } 
 = require("../controllers/admin.controller");

const { authenticate } = require('../config/jwt.config');

const { checkPermissions } = require('../config/jwt.config');

module.exports = (app) => {
  app.post("/api/registerAdmin", register);
  app.patch("/api/admins/password/:id",authenticate, checkPermissions('admin'), updateExistingAdminPassword);
  app.patch("/api/me/admins/:id",authenticate, checkPermissions('admin'), updateExistingAdmin);
  app.get('/api/admins/:id',authenticate, checkPermissions('admin'), findOneSingleAdmin);
  // app.post("/api/loginAdmin", login);
};
