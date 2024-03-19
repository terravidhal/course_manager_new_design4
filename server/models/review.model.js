const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const ReviewSchema = new mongoose.Schema(
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'A course ID is required for the review'],
      },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'A student ID is required for the review'],
      },
      rating: {
        type: Number,
        required: [true, 'A rating between 1 and 5 is required'],
        min: [1, "rating must be a minimum of 1"],
        max: [5, "rating should be no more than 5"],
      },
      reviewText: {
        type: String,
        minlength: [10, 'The review text must be at least 10 characters long'],
        maxlength: [250, 'The review text cannot exceed 250 characters'],
      },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;

