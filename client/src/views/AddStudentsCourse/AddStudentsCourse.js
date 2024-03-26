import React, {useState, useEffect} from 'react';
import './AddStudentsCourse.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';




const AddStudentsCourse = (props) => {

  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);

  useEffect(() => {
    if (userObjsRole === 'default' ||  userObjsRole === 'student') {
           navigate('/page404NotFound'); 
    }
  }, []);


  const { id } = useParams();
  const [coursObj, setCoursObj] = useState({});
  const [loaded, setLoaded] = useState(false); // check if the data is available
  const navigate = useNavigate();
  const [availableStudents, setavailableStudents] = useState([]);
  const [students, setStudents] = useState([]);


  //get  data one specific course
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/" + id,{withCredentials: true})
      .then((res) => {
       // console.log("u++++++++++",res.data);
        setCoursObj(res.data);
        setLoaded(true); // data available => set "true"
      })
      .catch((err) => console.log(err));
      
    }, [id]); 


   // get all  students
   useEffect(() => {
    axios
   .get("http://localhost:8000/api/students",{withCredentials: true})
   .then((res) => {
    // console.log('t+++++', res.data);
     setavailableStudents(res.data);
   })
   .catch((err) => console.log('err all users role students : ',err));
    }, []); 
 
   // Student selection management functions
   //add students
    const handleStudentSelection = (e,studentId) => {
      e.preventDefault();
      setStudents([...students, studentId]);
    };

   // remove students
   const handleStudentRemoval = (e,studentId) => {
     e.preventDefault();
     setStudents(students.filter((s) => s !== studentId));
   };


   useEffect(() => {
    if (coursObj.course && coursObj.course.students) {
      setStudents(coursObj.course.students);
    }
  }, [coursObj]);


  // update one specific course
  const updateCourse = (ev) => {
    ev.preventDefault();
    axios
      .patch(
        "http://localhost:8000/api/addStudents/courses/" + id,

        {
          students
        },
        {withCredentials: true} 
      )
      .then((res) => {
       // console.log(res.data.course);
        if (userObjsRole === 'admin') {
          navigate("/admin-dashboard");
        } else {
          navigate("/instructor-dashboard");
        }
      })
      .catch(err=>{
        console.log("err//////", err)
      }) 
  };

   


 
  return (
    <div className="AddStudentsCourse">
      <div className="page-top">
        <h1>Add / Remove </h1>
        <Link to="" onClick={()=>navigate(-1)}>
            <ion-icon name="arrow-back-circle-outline"></ion-icon>back 
        </Link>
      </div>
      <div className="page-content">
      {loaded === true && students.length > 0 ? 
          <>
              <div className="CourseForm">
                 <form onSubmit={updateCourse}>
                    <div className="form-left">
                      <div className='field stud-lab'>
                         <label>Students</label><br/>
                            <ul>
                                { availableStudents.map((elt) => (
                                  <li key={elt._id} >
                                    <span className="studPpties">{'  Name: '}</span>{elt.name}
                                    <span className="studPpties">{'  Level: '}</span>{elt.levelStudent}
                                   {students.some((elt2) => elt2 === elt._id) ? (
                                      <button className='Remove' onClick={(e) => handleStudentRemoval(e,elt._id)}>Remove</button>
                                    ) : (
                                      <button className='Add' onClick={(e) => handleStudentSelection(e,elt._id)}>Add</button>
                                    )} 
                                  </li>)) 
                                }
                            </ul>
                       </div>
                       <div className="validate_form">
                          <button className="submit_btn active" value="Update" type="submit">
                            <i class="fa-solid fa-pen"></i> &nbsp;Update
                          </button>
                       </div>
                    </div>
                 </form>
              </div>
          </>
       : (
        <p>Loading students...</p> //  loading indicator
      )}
       </div>
    </div>
  );

};


export default AddStudentsCourse;
