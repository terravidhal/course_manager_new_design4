const {
    register,
    createStudent,
    findAllStudents,
    findOneSingleStudent,
    deleteOneSpecificStudent,
    updateExistingStudent,
    updateExistingStudentPassword,
    updateStudentNameandEmail,
  } = require("../controllers/student.controller");

  const { authenticate } = require('../config/jwt.config');

  const { checkPermissions } = require('../config/jwt.config');
  
  module.exports = app => {
      app.post("/api/registerStudent", register);  
      app.post("/api/students",authenticate, checkPermissions('admin'), createStudent);
      app.get("/api/students",authenticate, checkPermissions('admin', 'instructor'), findAllStudents);
      app.get('/api/students/:id',authenticate, checkPermissions('admin','student'), findOneSingleStudent);
      app.patch("/api/students/:id",authenticate, checkPermissions('admin'), updateExistingStudent);
      app.patch("/api/students/password/:id",authenticate, checkPermissions('student'), updateExistingStudentPassword);
      app.patch("/api/me/students/:id",authenticate, checkPermissions('student'), updateStudentNameandEmail);
      app.delete("/api/students/:id",authenticate, checkPermissions('admin'),  deleteOneSpecificStudent);
  }
  
  
  
  