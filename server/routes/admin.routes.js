const { register,
        UpdateImageAdmin,
        findOneSingleAdmin,
        updateExistingAdmin,
        updateExistingAdminPassword,
      } 
 = require("../controllers/admin.controller");

const { authenticate } = require('../config/jwt.config');

const { checkPermissions } = require('../config/jwt.config');

const { upload } = require('../config/multer.config');



module.exports = (app) => {
  app.post("/api/registerAdmin", register);
  app.patch("/api/upload-image/admins/:id",authenticate, checkPermissions('admin'), upload.single("image"), UpdateImageAdmin);
  app.patch("/api/admins/password/:id",authenticate, checkPermissions('admin'), updateExistingAdminPassword);
  app.patch("/api/me/admins/:id",authenticate, checkPermissions('admin'), updateExistingAdmin);
  app.get('/api/admins/:id',authenticate, checkPermissions('admin'), findOneSingleAdmin);
  // app.post("/api/loginAdmin", login);
};
