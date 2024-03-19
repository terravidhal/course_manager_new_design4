const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Review = require("../models/review.model");

module.exports = {

    createNewReview : (req, res) => {
      Review.create(req.body)
        .then((newlyCreatedReview) => {
          res.json({ newlyCreatedReview });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },

    deleteAnExistingReview : (req, res) => {
      Review.deleteOne({ _id: req.params.id })
        .then((result) => {
          res.json({ result });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    },


    findAllReviews : (req, res) => {
      Review.find()
         .sort({ name: 1 })
         .then((allReviews) => {
           res.json({ allReviews });
         })
         .catch((err) => {
           res.status(400).json(err);
         });
     },

  
  
    findAllReviewBySpecificCourse: async(req, res) => {
        const { courseId } = req.params;

        try {
          const reviews = await Review.find({ courseId: courseId }).populate('studentId');
      
          if (!reviews) {
            return res.status(400).json({ message: "reviews not found" });
          }

          res.status(201).json({
            reviews: reviews,
          });
          
        } catch (err) {
          console.error(err);
          res.status(400).json({ message: "An error occurred" });
        }
    },

    findAllReviewByManyCourses: async (req, res) => {
      const { courseIds } = req.params; 
    
      try {
        // $in recherch dns le tableau 'courseIds'
        const reviews = await Review.find({ courseId: { $in: courseIds } }).populate('studentId');
    
        if (!reviews.length) { 
          return res.status(400).json({ message: "reviews not found" });
        }
    
        // Transform du résultat en tableau de reviews
     /*   const reviewsData = reviews.map((review) => {
          return {
            id: review._id,
            courseId: review.courseId,
            studentId: review.studentId,
            rating: review.rating,
            reviewText: review.reviewText,
          };
        });  */
        res.status(201).json({
          reviews: reviews,
        });
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: "An error occurred" });
      }
    },
};
