const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const StudentModel = require("../models/student.model");

module.exports = {
  register: (req, res) => {
    const newStudent = new StudentModel(req.body);

    newStudent
      .save()
      .then((newStud) => {
        const studentInfo = {
          _id: newStud._id,
          name: newStud.name,
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
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(400).json({ message: "Something went wrong", errors: err });
      });
  },

  createStudent: (req, res) => {
    const newStudent = new StudentModel(req.body);

    newStudent
      .save()
      .then((newStudent) => {
        res.status(201).json({
          message: "Student successfully created",
          student: newStudent,
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(400).json({ message: "Something went wrong", errors: err });
      });
  },

  updateExistingStudent: async (req, res) => {
    const { id, name, email, fieldOfStudy, levelStudent } = req.body;

    StudentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
        fieldOfStudy: fieldOfStudy,
        levelStudent: levelStudent,
      },
      { new: true, runValidators: true }
    )
      .then((updatedStudent) => {
        if (!updatedStudent) {
          return res.status(404).json({ message: "Étudiant introuvable" });
        }
        res.status(200).json({
          message: "Étudiant mis à jour avec succès",
          student: updatedStudent,
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res
          .status(400)
          .json({ message: "Une erreur s'est produite", errors: err });
      });
  },

  updateStudentNameandEmail: async (req, res) => {
    const { id, name, email } = req.body;

    StudentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
      },
      { new: true, runValidators: true }
    )
      .then((updatedStudent) => {
        if (!updatedStudent) {
          return res.status(404).json({ message: "Étudiant introuvable" });
        }
        res.status(200).json({
          message: "Étudiant mis à jour avec succès",
          student: updatedStudent,
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res
          .status(400)
          .json({ message: "Une erreur s'est produite", errors: err });
      });
  },

  updateExistingStudentPassword: async (req, res) => {
    const {  id, password, confirmPassword, previousPassword } = req.body;

     // Check if previousPassword 
     const student = await StudentModel.findOne({ _id: id });
     const isPreviousPasswordValid = await bcrypt.compare(
       previousPassword,
       student.password
     );
 
     if (!isPreviousPasswordValid) {
       return res
         .status(400)
         .json({ message: "previous password is incorrect !" });
     }
 
     if (password === previousPassword) {
       return res
         .status(400)
         .json({ message: "the new password must be different from the old one !" });
     }

    // Check if password update is requested
    if (password) {
      // Validate and hash the new password
      const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
      if (!passwordValidation) {
        return res.status(400).json({
          message: "Error: password must contain at least one lowercase letter, one uppercase letter, one number and one special character, and be at least 8 characters long",
        });
      }
    }
    else{
      return res.status(400).json({ message: "passwords doesn't exists." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Error: passwords didn't match. Please try again.", p:password, cp:confirmPassword });
    }

    StudentModel.findOneAndUpdate(
      { _id: id },
      {
        password: await bcrypt.hash(password, 10),
      },
      { new: true, runValidators: true }
    )
      .then((updatedStudent) => {
        if (!updatedStudent) {
          return res.status(404).json({ message: "Étudiant introuvable" });
        }
        res.status(200).json({
          message: "Étudiant mis à jour avec succès",
          student: updatedStudent,
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res
          .status(400)
          .json({ message: "Une erreur s'est produite", errors: err });
      });
  },

  findAllStudents: (req, res) => {
    StudentModel.find({})
      .then((allStudents) => res.status(200).json(allStudents))
      .catch((err) =>
        res.status(400).json({ message: "Something went wrong", error: err })
      );
  },

  findOneSingleStudent: (req, res) => {
    StudentModel.findOne({ _id: req.params.id })
      .then((oneSingleStudent) => {
        console.log("oneSingleStudent", oneSingleStudent);
        res.json({ oneSingleStudent });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  deleteOneSpecificStudent: (req, res) => {
    const studentId = req.params.id;

    StudentModel.findByIdAndDelete(studentId)
      .then((deletedStudent) => {
        if (!deletedStudent) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
      })
      .catch((err) =>
        res.status(400).json({ message: "Something went wrong", error: err })
      );
  },
};
