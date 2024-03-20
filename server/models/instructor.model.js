const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const InstructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Error: name is required"],
    },
    skills: {
      type: String,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Error: email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Error: password is required"],
      validate: {
        validator: function(value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
        },
        message: "Error: password must contain at least one lowercase letter, one uppercase letter, one number and one special character, and be at least 8 characters long",
      },
    },
    role: {
      type: String,
      default: "instructor",
      required: true,
    },
    isInstructor: {
      type: String,
      enum: ["false", "true"],
      default: "false",
      required: [true, "isInstructor is required"],
    },
  },
  {
    timestamps: true,
  }
);

InstructorSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

InstructorSchema.pre("validate", function (next) {
  if (this.confirmPassword !== this.password) {
    this.invalidate(
      "confirmPassword",
      "Error: passwords didn't match. Please try again."
    );
  }

  next();
});

InstructorSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    this.password = hashedPassword;
    next();
  });
});

const InstructorModel = mongoose.model("Instructor", InstructorSchema);

module.exports = InstructorModel;
