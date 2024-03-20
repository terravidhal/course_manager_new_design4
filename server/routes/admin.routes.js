const { register,
        uploadAdminImage,
        postImage,
        findOneSingleAdmin,
        updateExistingAdmin,
        updateExistingAdminPassword,
      } 
 = require("../controllers/admin.controller");

const { authenticate } = require('../config/jwt.config');

const { checkPermissions } = require('../config/jwt.config');

const { uploadImage } = require('../config/multer.config');

const { upload } = require('../config/upload');



module.exports = (app) => {
  app.post("/api/registerAdmin", register);
  app.patch("/api/upload-image/admin/:id", upload.single("image"), postImage);
  app.post("/api/upload-image/:id", upload.single("image"), uploadAdminImage);
  app.patch("/api/admins/password/:id",authenticate, checkPermissions('admin'), updateExistingAdminPassword);
  app.patch("/api/me/admins/:id",authenticate, checkPermissions('admin'), updateExistingAdmin);
  app.get('/api/admins/:id',authenticate, checkPermissions('admin'), findOneSingleAdmin);
  // app.post("/api/loginAdmin", login);
};
