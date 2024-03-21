const {
    register,
    createInstructor,
    UpdateImageInstructor,
    findAllInstructors,
    findOneSingleInstructor,
    findSingleEntityInstructorOrAdmin,
    deleteOneSpecificInstructor,
    updateExistingInstructor,
    updateExistingInstructorPassword,
    updateInstructorNameandEmail,
  } = require("../controllers/instructor.controller");
  
  const { authenticate } = require('../config/jwt.config');

  const { checkPermissions } = require('../config/jwt.config');

  const { upload } = require('../config/multer.config');

  module.exports = app => {
      app.post("/api/registerInstructor", register);  
      app.post("/api/instructors",authenticate,checkPermissions('admin'), createInstructor); 
      app.patch("/api/upload-image/instructors/:id",authenticate, checkPermissions('instructor'), upload.single("image"), UpdateImageInstructor);
      app.get("/api/instructors",authenticate, checkPermissions('admin'), findAllInstructors);
      app.get('/api/instructors/:id',authenticate, checkPermissions('admin','instructor'), findOneSingleInstructor);
      app.get('/api/instructorOradmin/:id',authenticate, checkPermissions('admin','instructor','student'), findSingleEntityInstructorOrAdmin);
      app.patch("/api/instructors/:id",authenticate, checkPermissions('admin'), updateExistingInstructor);
      app.patch("/api/instructors/password/:id",authenticate, checkPermissions('instructor'), updateExistingInstructorPassword);
      app.patch("/api/me/instructors/:id",authenticate, checkPermissions('instructor'), updateInstructorNameandEmail);
      app.delete("/api/instructors/:id",authenticate, checkPermissions('admin'),  deleteOneSpecificInstructor);
  }
  
  
  
  
  
  