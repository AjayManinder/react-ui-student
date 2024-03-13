import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../axiosConfig";
import "./subject.css";
import { Context } from "../../../App";

const SubjectRegistration = () => {
  const [subjects, setSubjects] = useState([]);
  const [studentSubjects, setStudentSubjects] = useState([]); // Initialize as an empty array
  const [userDetails, setUserDetails] = useContext(Context);

  useEffect(() => {
    axiosInstance.get("/subjects")
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
      });

    axiosInstance.get(`/students/${userDetails?.student?._id}`)
      .then(response => {
        setStudentSubjects(response.data.subjectIds);
      })
      .catch(error => {
        console.error('Error fetching student subjects:', error);
      });
  }, [userDetails]); // Include userDetails in the dependency array

  // const handleRegisterSubject = async (subjectId) => {
  //   try {
  //     if (studentSubjects.some(subject => subject._id === subjectId)) {
  //       alert('Subject already registered!');
  //     } else {
  //       const rollNo = userDetails?.student?.rollNo; // Get the rollNo from userDetails
  //       if (!rollNo) {
  //         // Handle case where rollNo is not available
  //         return;
  //       }
  
  //       await axiosInstance.put(`/students/${rollNo}`, { // Use rollNo in the PUT request
  //         subjectIds: [...studentSubjects, subjectId],
  //       });
  
  //       setStudentSubjects(prevStudentSubjects => [...prevStudentSubjects, subjectId]);
  
  //       alert('Subject added successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Error adding subject:', error);
  //     alert('An error occurred while adding subject.');
  //   }
  // };

  const handleRegisterSubject = async (subjectId) => {
    try {
      const rollNo = userDetails?.student?.rollNo;
      if (!rollNo) {
        // Handle case where rollNo is not available
        return;
      }
  
      // Fetch the current list of student subjects
      const response = await axiosInstance.get(`/students/${rollNo}`);
      const currentSubjects = response.data.subjectIds;
  
      console.log('Current Subjects:', currentSubjects);
  
      // Check if the subject is already present in the student's subjects
      if (currentSubjects.includes(subjectId)) {
        throw new Error('Subject already registered!');
      }

  
      // Make a POST request to add the subject to the student's record
      await axiosInstance.post(`/students/${rollNo}/subjects`, { subjectId });
  
      // Update the list of student subjects
      setStudentSubjects([...currentSubjects, subjectId]);
  
      alert('Subject added successfully!');
    } catch (error) {
      console.error('Error adding subject:', error);
      alert(error.message || 'An error occurred while adding subject.');
    }
  };
  
  
  
  

  return (
    <div className="subject-registration">
      <h2>Subject Registration</h2>
      <div className="subject-list">
        {subjects.map(subject => (
          <li key={subject._id} className="subject">
            <div>
              <h1>{subject.name}</h1>
              <li>{subject.description}</li>
              <ol>
                <li>Credits: {subject.subjectCredits}</li>
                <li>Topics: {subject.topics.join(', ')}</li>
              </ol>
            </div>
            <div className="register-subject-container">
              <button
                className="register-subject"
                onClick={() => handleRegisterSubject(subject._id)}
              >
                Register
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SubjectRegistration;
