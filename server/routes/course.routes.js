const CourseController = require('../controllers/course.controller');
 
const { authenticate } = require('../config/jwt.config');

const { checkPermissions } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/courses',authenticate, checkPermissions('admin'), CourseController.findAllCourses);  
    app.get('/api/courses/:id',authenticate, checkPermissions('admin','instructor','student'), CourseController.findOneSingleCourse2);
    app.get('/api/courses/instructor/:id',authenticate, checkPermissions('admin','instructor'), CourseController.findAllCoursesByInstructor);
    app.get('/api/courses/instructor2/:id',authenticate, checkPermissions('admin','instructor','student'), CourseController.findAllCoursesByInstructor2);
    app.get('/api/courses/student/:id',authenticate, checkPermissions('admin','student'), CourseController.findAllCoursesByStudent);
    app.get('/api/students/course/:courseId',authenticate,checkPermissions('admin','instructor'), CourseController.findAllStudentsBySpecificCourse);
    app.patch('/api/courses/:id',authenticate,checkPermissions('admin','instructor'), CourseController.updateExistingCourse); 
    app.post('/api/courses',authenticate, checkPermissions('admin','instructor'), CourseController.createNewCourseWithMatchingStudents);
    app.delete('/api/courses/:id',authenticate,checkPermissions('admin','instructor'),  CourseController.deleteAnExistingCourse);
}

