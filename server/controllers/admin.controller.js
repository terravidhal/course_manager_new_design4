const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin.model");





module.exports = {
  register: (req, res) => {
    if (req.body.keyCode !== process.env.KEY_CODE) {
      return res.status(400).json({ message: "Invalid keycode", errors: "Invalid keycode" });
    }

    const { keycode, ...adminData } = req.body;

    req.body = adminData;

    const newAdmin = new AdminModel(req.body);

    newAdmin
      .save()
      .then((newAdmin) => {
        res
          .status(201)
          .json({ message: "Admin successfully created", admin: newAdmin });
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



  postImage : async (req, res) => {
  //  const { id, name, email } = req.body;
    const { filename } = req.file;

    AdminModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        image: filename,
      },
      { new: true, runValidators: true }
    )
      .then((updatedAdmin) => {
        if (!updatedAdmin) {
          return res.status(404).json({ message: "admin introuvable" });
        }
        res.status(200).json({
          message: "admin mis à jour avec succès",
          admin: updatedAdmin,
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

    postImage2 :  async (req, res) => {
        const { name, email, age } = req.body;
        const { filename } = req.file;
    
        try {
          if (name && email && age && filename) {
            const newUser = new userModel({
              name,
              email,
              age,
              image: filename,
            });
    
            const new_user = await newUser.save();
            if (new_user) {
              return res.status(200).json(newUser);
            } else {
              return res.status(400).json({ messsage: "something wrong" });
            }
          } else {
            return res.status(400).json({ messsage: "all fields are required" });
          }
        } catch (error) {
          return res.status(400).json(error);
        }
   
  },

  uploadAdminImage: async (req, res) => {
   // const { id, name, email } = req.body;
    const { filename } = req.file;

    AdminModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        image: filename
      },
      { new: true, runValidators: true }
    )
      .then((updatedAdmin) => {
        if (!updatedAdmin) {
          return res.status(404).json({ message: "admin introuvable" });
        }
        res.status(200).json({
          message: "admin mis à jour avec succès",
          admin: updatedAdmin,
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

  uploadAdminImage2: async (req, res) => {
    // console.log(req.body); 
  
    // Check if image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
  
    const imageName = req.file.filename;
  
    try {
      // Create a new Admin document with the image name
      const newAdmin = new AdminModel({ image: imageName });
      await newAdmin.save(); // Use .save() to persist the data
  
      res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(400).json({ message: "An error occurred during upload" });
    }
  },



  findOneSingleAdmin: (req, res) => {
    AdminModel.findOne({ _id: req.params.id })
      .then((oneSingleAdmin) => {
        console.log("oneSingleAdmin", oneSingleAdmin);
        res.json({ oneSingleAdmin });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },


  updateExistingAdmin: async (req, res) => {
    const { id, name, email } = req.body;

    AdminModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name,
        email: email,
      },
      { new: true, runValidators: true }
    )
      .then((updatedAdmin) => {
        if (!updatedAdmin) {
          return res.status(404).json({ message: "admin introuvable" });
        }
        res.status(200).json({
          message: "admin mis à jour avec succès",
          admin: updatedAdmin,
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

  updateExistingAdminPassword: async (req, res) => {
    const { id, password, confirmPassword, previousPassword } = req.body;

    // Check if previousPassword 
    const admin = await AdminModel.findOne({ _id: id });
    const isPreviousPasswordValid = await bcrypt.compare(
      previousPassword,
      admin.password
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

    AdminModel.findOneAndUpdate(
      { _id: id },
      {
        password: await bcrypt.hash(password, 10),
      },
      { new: true, runValidators: true }
    )
      .then((updatedAdmin) => {
        if (!updatedAdmin) {
          return res.status(404).json({ message: "admin introuvable" });
        }
        res.status(200).json({
          message: "admin mis à jour avec succès",
          admin: updatedAdmin,
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
};
