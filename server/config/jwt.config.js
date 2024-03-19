const jwt = require("jsonwebtoken");

const StudentModel = require("../models/student.model");

const InstructorModel = require("../models/instructor.model");

const AdminModel = require("../models/admin.model");

module.exports = {
  authenticate: (req, res, next) => {
    const currentUrl = req.headers.host + req.url;
    if (!req.cookies.usertoken) {
      return res.status(401).json({
        verified: false,
        message: "No token provided.",
        currentUrl: currentUrl,
      });
    }

    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        const admin = await AdminModel.findOne({ _id: decodedToken._id });
        const student = await StudentModel.findOne({ _id: decodedToken._id });
        const instructor = await InstructorModel.findOne({
          _id: decodedToken._id,
        });
        console.log(" decodedToken._id", decodedToken._id);
        if (err) { 
          res
            .status(401)
            .json({
              verified: false,
              message: "please make you are logged in",
            });
        } else {
          if (admin) {
            console.log("admin", admin);
            req.role = admin.role;
            console.log("You are authenticated!");
            next();
          } else if (student) {
            console.log("student", student);
            req.role = student.role;
            console.log("You are authenticated!");
            next();
          } else if (instructor) {
            console.log("instructor", instructor);
            req.role = instructor.role;
            req.isInstructor = instructor.isInstructor;
            console.log("You are authenticated!");
            next();
          } else {
            console.log("null");
            res.status(401).json({
              verified: false,
              message: "Unauthorized access.",
            });
          }
        }
      }
    );
  },

  checkPermissions: (...role) => {
    return (req, res, next) => {
      if (!role.includes(req.role)) {
        const error = res
          .status(401)
          .json({
            verified: false,
            message: "you do not have permission to perform this action",
          });
        next(error);
      } else {
        next();
      }
    };
  },
};
