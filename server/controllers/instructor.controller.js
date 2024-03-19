const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const InstructorModel = require("../models/instructor.model");
const AdminModel = require("../models/admin.model");
const {
  sendNewInstructorNotification,
} = require("../notifications/notifications");



module.exports = {
  register: async (req, res) => {
    try {
      const newInstructor = new InstructorModel(req.body);

      const savedInstructor = await newInstructor.save();

      const instructorInfo = {
        _id: savedInstructor._id,
        name: savedInstructor.name,
        email: savedInstructor.email,
        role: "instructor",
        isInstructor: savedInstructor.isInstructor,
      };

      const instructorToken = jwt.sign(instructorInfo, process.env.JWT_SECRET);

      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7200000),
      };

      res.cookie("usertoken", instructorToken, cookieOptions).json({
        message: "Successfully logged in",
        instructor: instructorInfo,
      });

      await sendNewInstructorNotification(instructorInfo); // Call the notification function
    } catch (err) {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Validation Errors", errors: err });
      }
      res.status(400).json({ message: "Something went wrong", errors: err });
    }
  },

  createInstructor: (req, res) => {
    const newInstructor = new InstructorModel(req.body);

    newInstructor
      .save()
      .then((newInstructor) => {
        res.status(201).json({
          message: "Instructor successfully created",
          instructor: newInstructor,
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

  updateExistingInstructor: async (req, res) => {
    const { id, name, email, isInstructor } = req.body;

    InstructorModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
        isInstructor: isInstructor,
      },
      { new: true, runValidators: true }
    )
      .then((updatedInstructor) => {
        if (!updatedInstructor) {
          return res.status(404).json({ message: "instructeur introuvable" });
        }
        res.status(200).json({
          message: "instructeur mis à jour avec succès",
          instructor: updatedInstructor,
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

  updateInstructorNameandEmail: async (req, res) => {
    const { id, name, email } = req.body;

    InstructorModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
      },
      { new: true, runValidators: true }
    )
      .then((updatedInstructor) => {
        if (!updatedInstructor) {
          return res.status(404).json({ message: "instructeur introuvable" });
        }
        res.status(200).json({
          message: "instructeur mis à jour avec succès",
          instructor: updatedInstructor,
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


  updateExistingInstructorPassword: async (req, res) => {
    const { id, password, confirmPassword, previousPassword } = req.body;

     // Check if previousPassword 
     const instructor = await InstructorModel.findOne({ _id: id });
     const isPreviousPasswordValid = await bcrypt.compare(
       previousPassword,
       instructor.password
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

    InstructorModel.findOneAndUpdate(
      { _id: id },
      {
        password: await bcrypt.hash(password, 10),
      },
      { new: true, runValidators: true }
    )
      .then((updatedInstructor) => {
        if (!updatedInstructor) {
          return res.status(404).json({ message: "instructeur introuvable" });
        }
        res.status(200).json({
          message: "instructeur mis à jour avec succès",
          instructor: updatedInstructor,
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

 
  findAllInstructors: (req, res) => {
    InstructorModel.find({})
      .then((allInstructors) => res.status(200).json(allInstructors))
      .catch((err) =>
        res.status(400).json({ message: "Something went wrong", error: err })
      );
  },

  findOneSingleInstructor: (req, res) => {
    InstructorModel.findOne({ _id: req.params.id })
      .then((oneSingleInstructor) => {
        console.log("oneSingleInstructor", oneSingleInstructor);
        res.json({ oneSingleInstructor });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },


  findSingleEntityInstructorOrAdmin: async (req, res) => {
    const { id } = req.params;
    const instructor = await InstructorModel.findOne({ _id: id });
    const admin = await AdminModel.findOne({ _id: id });

    if (instructor) {
      try {
        if (!instructor)
          return res.status(404).json({ error: "Instructor not found" });
        return res.json({ result: instructor });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    } else if (admin) {
      try {
        if (!admin) return res.status(404).json({ error: "Admin not found" });
        return res.json({ result: admin });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    } else {
      return res.status(400).json({ error: "Invalid entity type" });
    }
  },

  deleteOneSpecificInstructor: (req, res) => {
    InstructorModel.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

};
