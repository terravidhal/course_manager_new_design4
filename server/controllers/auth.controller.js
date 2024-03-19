const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const StudentModel = require("../models/student.model");

const InstructorModel = require("../models/instructor.model");

const AdminModel = require("../models/admin.model");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const student = await StudentModel.findOne({ email });
      const instructor = await InstructorModel.findOne({ email });
      const admin = await AdminModel.findOne({ email });

      if (student) {
        const isPasswordValid = await bcrypt.compare(
          password,
          student.password
        );

        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ message: "Incorrect email or password" });
        }

        const studentInfo = {
          _id: student._id,
          name: student.name,
          role: "student",
        };

        const studentToken = jwt.sign(studentInfo, process.env.JWT_SECRET);

        const cookieOptions = {
          httpOnly: true,
          expires: new Date(Date.now() + 7200000),
        };

        res.cookie("usertoken", studentToken, cookieOptions).json({
          message: "Successfully logged in",
          student: studentInfo,
          studentToken: studentToken,
        });
      } else if (instructor) {
        const isPasswordValid = await bcrypt.compare(
          password,
          instructor.password
        );

        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ message: "Incorrect email or password" });
        }

        const instructorInfo = {
          _id: instructor._id,
          name: instructor.name,
          role: "instructor",
          isInstructor: instructor.isInstructor,
        };

        const instructorToken = jwt.sign(
          instructorInfo,
          process.env.JWT_SECRET
        );

        const cookieOptions = {
          httpOnly: true,
          expires: new Date(Date.now() + 7200000),
        };

        res.cookie("usertoken", instructorToken, cookieOptions).json({
          message: "Successfully logged in",
          instructor: instructorInfo,
          instructorToken: instructorToken,
        });
      } else if (admin) {
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ message: "Incorrect email or password" });
        }

        const adminInfo = {
          _id: admin._id,
          name: admin.name,
          role: "admin",
        };

        const adminToken = jwt.sign(adminInfo, process.env.JWT_SECRET);

        const cookieOptions = {
          httpOnly: true,
          expires: new Date(Date.now() + 7200000), // expire dns 2h = 7200000 ms
        };

        res.cookie("usertoken", adminToken, cookieOptions).json({
          message: "Successfully logged in",
          admin: adminInfo,
          adminToken: adminToken,
        });
      } else {
        res.status(400).json({ message: "Incorrect email or password" });
      }
    } catch (error) {
      res.status(400).json({ message: "Something went wrong", error });
    }
  },

  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
    });
  },
};
