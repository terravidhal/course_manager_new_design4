const {
    createNewReview,
    deleteAnExistingReview,
    findAllReviews,
    findAllReviewBySpecificCourse,
    findAllReviewByManyCourses,
  } = require("../controllers/review.controller");
  
  const { authenticate } = require('../config/jwt.config');

  const { checkPermissions } = require('../config/jwt.config');

  module.exports = app => {
      app.post('/api/reviews',authenticate, checkPermissions('student'), createNewReview);
      app.get('/api/reviews',authenticate, checkPermissions('admin','student','insructor'), findAllReviews);
      app.get('/api/reviews/course/:courseId',authenticate, checkPermissions('admin','student','insructor'), findAllReviewBySpecificCourse);
      app.get('/api/reviews/courseArray/:courseIds',authenticate, checkPermissions('admin','student','insructor'), findAllReviewByManyCourses);
      app.delete('/api/reviews/:id',authenticate,checkPermissions('admin','instructor','student'),  deleteAnExistingReview);
  }
  
  
  
  
  
  