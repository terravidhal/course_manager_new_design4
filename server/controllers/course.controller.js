const Course = require("../models/course.model");

const StudentModel = require("../models/student.model");
const InstructorModel = require("../models/instructor.model");
const AdminModel = require("../models/admin.model");

module.exports.findAllCourses = (req, res) => {
 // console.log("req.role", req.role);
 // console.log("req.Isinstrucor", req.isInstructor);
  Course.find()
    .sort({ name: 1 })
    .then((allDaCourses) => {
      res.json({ allDaCourses });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.findAllCoursesByInstructor = (req, res) => {
  const instructorId = req.params.id;

  Course.find({ instructor: instructorId })
    .sort({ name: 1 })
    .then((coursesByInstructor) => {
      res.json({ coursesByInstructor });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.findAllCoursesByInstructor2 = (req, res) => {
  const instructorId = req.params.id;

  Course.find({ instructor: instructorId })
    .sort({ name: 1 })
    .then((coursesByInstructor) => {
      res.json({ coursesByInstructor });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// find all courses by specific student
module.exports.findAllCoursesByStudent = (req, res) => {
  const studentId = req.params.id;

  Course.find({ students: studentId })
    .sort({ name: 1 })
    .then((coursesByStudent) => {
      res.json({ coursesByStudent });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.findOneSingleCourse = (req, res) => {
  Course.findOne({ _id: req.params.id })
    .then((oneSingleCourse) => {
      console.log("oneSingleCourse", oneSingleCourse);
      res.json({ oneSingleCourse });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



module.exports.findOneSingleCourse2 = async (req, res) => {
  try {
    const oneSingleCourse = await Course.findOne({ _id: req.params.id });

    if (!oneSingleCourse) {
      return res.status(400).json({ message: "No courses found with this ID" });
    }

    const instructorId = oneSingleCourse.instructor;

    let oneSingleUser = await InstructorModel.findById(instructorId);

    if (oneSingleUser) {
      const combinedResponse = {
        course: oneSingleCourse,
        oneSingleUser: oneSingleUser
      };
      res.json(combinedResponse);
    } else {
       oneSingleUser = await AdminModel.findById(instructorId);

      if (oneSingleUser) {
        const combinedResponse = {
          course: oneSingleCourse,
          oneSingleUser: oneSingleUser
        };
        res.json(combinedResponse);
      } else {
        return res.status(400).json({ message: "No instructors or admins found with this ID" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "An error has occurred" });
  }
};


module.exports.createNewCourse = (req, res) => {
  Course.create(req.body)
    .then((newlyCreatedCourse) => {
      res.json({ newlyCreatedCourse });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.createNewCourseWithMatchingStudents = async (req, res) => {
  try {
    const {
      name,
      field,
      level,
      description,
      instructor,
      dayOfWeek,
      duration,
      students,
      linkMeeting,
      documentsLink,
      typeOfCourse,
      startTime,
      endTime,
    } = req.body;

    const matchingStudents = await StudentModel.find(
      {
        fieldOfStudy: field,
        levelStudent: level,
      },
      { _id: true }
    );

    const newCourse = new Course({
      name,
      field,
      level,
      description,
      instructor,
      dayOfWeek,
      duration,
      students,
      linkMeeting,
      documentsLink,
      typeOfCourse,
      startTime,
      endTime,
      students: matchingStudents.map(({ _id }) => _id),
    });

    await newCourse.save();

    res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("error backend", error);

    res.status(400).json({ error: error.message });
  }
};

module.exports.updateExistingCourse = (req, res) => {
  Course.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedCourse) => {
      res.json({ updatedCourse });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.deleteAnExistingCourse = (req, res) => {
  Course.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.findAllStudentsBySpecificCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate("students");

    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }

    const students = course.students.map((student) => {
      return {
        _id: student._id,
        name: student.name,
        email: student.email,
        fieldOfStudy: student.fieldOfStudy,
        levelStudent: student.levelStudent,
      };
    });

    res.json({ students });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "An error occurred" });
  }
};
