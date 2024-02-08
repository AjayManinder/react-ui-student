import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../App';
import './studentInfo.css'; // Make sure the path to your CSS file is correct

const StudentInfo = () => {
  const [studentDetails, setStudentDetails] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [yearSems, setYearSems] = useState([]);
  const [userDetails, setUserDetails] = useContext(Context);
  const [activeButton, setActiveButton] = useState('general');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (userDetails?.student) {
      setStudentDetails(userDetails.student);
      setSubjects(userDetails.student.subjectIds || []); // Initialize with an empty array if undefined
      setYearSems(userDetails.student.yearSemIds || []); // Initialize with an empty array if undefined
    }
  }, [userDetails]);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  }


  return (
    <div className="student-info-container">
      <div className="button-container">
        <button className={`info-button ${activeButton === 'general' ? 'active' : ''}`} onClick={() => handleButtonClick('general')}>General Info</button>
        <button className={`info-button ${activeButton === 'subjects' ? 'active' : ''}`} onClick={() => handleButtonClick('subjects')}>Show Subjects</button>
        <button className={`info-button ${activeButton === 'yearSem' ? 'active' : ''}`} onClick={() => handleButtonClick('yearSem')}>Show Year Semesters</button>
      </div>

      <div className="info-container">
        {activeButton === 'general' && (
          <div>
            <h1>Student Information</h1>
            <div>
              <h3>Name: {studentDetails.name}</h3>
              <h3>Roll Number: {studentDetails.rollNo}</h3>
              <h3>Branch: {studentDetails.branch}</h3>
              <h3>Percentage: {studentDetails.percentage}</h3>
            </div>
          </div>
        )}

        {activeButton === 'subjects' && (
          <div className="subject-container"> {/* Make sure this class name matches the one in your CSS */}
            <h2>Subjects</h2>
            <ul>
              {subjects.map(subject => (
                <li key={subject._id}>
                  <strong>{subject.name}</strong>: {subject.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeButton === 'yearSem' && (
          <div className="year-sem-container"> {/* Make sure this class name matches the one in your CSS */}
            <h2>Year Semesters</h2>
            <ul>
              {yearSems.map(yearSem => (
                <li key={yearSem._id}>{`Year ${yearSem.year}, Semester ${yearSem.sem}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;
