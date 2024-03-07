import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosConfig";
import "./subject.css";
const SubjectRegistration = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axiosInstance.get("/subjects")
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  return (
    <div className="subject-registration">
      <h2>Subject Registration</h2>
      <div className="subject-list">
        {subjects.map(subject => (
          <div key={subject._id} className="subject">
            <div>
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
            <p>Credits: {subject.subjectCredits}</p>
            <p>Topics: {subject.topics.join(', ')}</p>
            </div>
            <div className="register-subject-container">
            <button className="register-subject">Register</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectRegistration;
