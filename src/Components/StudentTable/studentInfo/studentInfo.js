import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../App";
import "./studentInfo.css"; // Make sure the path to your CSS file is correct
import { FiAlignRight } from "react-icons/fi";
import StudentAdditionalInfo from "./studentAdditionalInfo"; // Make sure the path to your component is correct
const StudentInfo = () => {
  const [studentDetails, setStudentDetails] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [yearSems, setYearSems] = useState([]);
  const [userDetails, setUserDetails] = useContext(Context);
  const [activeButton, setActiveButton] = useState("general");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    if (userDetails?.student) {
      setStudentDetails(userDetails.student);
      setSubjects(userDetails.student.subjectIds || []); // Initialize with an empty array if undefined
      setYearSems(userDetails.student.yearSemIds || []); // Initialize with an empty array if undefined
    }
  }, [userDetails]);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setIsDropdownOpen(false);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="student-info-container">
      <div className="desktop-links-button">
        <div className="button-container-desktop">
          <img
            className="profile-image"
            src="https://images.unsplash.com/photo-1661745688379-6f43af8e77bf?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile-Image"
          />
          <button
            className={`info-button ${
              activeButton === "general" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("general")}
          >
            General Info
          </button>
          <button
            className={`info-button ${
              activeButton === "subjects" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("subjects")}
          >
            Subjects
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Year/Semester
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Grades
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Subjects Enrolled
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Financial Info
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Transcripts
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Attendence
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Report Card
          </button>
          {/* <button className={`info-button ${activeButton === 'yearSem' ? 'active' : ''}`} onClick={() => handleButtonClick('yearSem')}></button> 
         <button className={`info-button ${activeButton === 'yearSem' ? 'active' : ''}`} onClick={() => handleButtonClick('yearSem')}></button> 
         <button className={`info-button ${activeButton === 'yearSem' ? 'active' : ''}`} onClick={() => handleButtonClick('yearSem')}></button>     */}
        </div>
      </div>

      <div
        className="dropdown-mobile-view"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button className="dropbtn-mobile-view" onClick={handleDropdownClick}>
          <FiAlignRight />
        </button>
        {/* Dropdown content */}
        <div
          className={`dropdown-contents-mobile-view ${
            isDropdownOpen ? "show" : ""
          }`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className={`info-button ${
              activeButton === "general" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("general")}
          >
            General Info
          </button>
          <button
            className={`info-button ${
              activeButton === "subjects" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("subjects")}
          >
            Subjects
          </button>
          <button
            className={`info-button ${
              activeButton === "yearSem" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("yearSem")}
          >
            Year/Semester
          </button>
          {/* </div> */}
        </div>
      </div>

      <div className="info-container">
        {activeButton === "general" && (
          <div className="student-main-container">
            <div className="student-information-main-container">
              <div>
                <h2>Student Information</h2>
                <div>
                  <div className="student-details-text-info">
                    <span>Name:</span>
                    <span>{studentDetails.name}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Roll Number:</span>
                    <span>
                      {studentDetails.rollNo}
                      {studentDetails.rollNo}
                    </span>{" "}
                  </div>
                  <div className="student-details-text-info">
                    <span>Branch:</span>
                    <span>{studentDetails.branch}</span>{" "}
                  </div>
                  <div className="student-details-text-info">
                    <span>Percentage:</span>
                    <span>{studentDetails.percentage}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2>Student BIO Information</h2>
                <div>
                 
                  <div className="student-details-text-info">
                    <span>Level:</span>
                    <span>N/A</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Class:</span>
                    <span>Graduate</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Status:</span>
                    <span>Active</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Student Type:</span>
                    <span>Masters - Graduate</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Residency:</span>
                    <span>International</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Campus:</span>
                    <span>Not Provided</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>First Term Attended:</span>
                    <span>Fall 2021</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Matriculated Term:</span>
                    <span>Not Provided</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Last Term Attended:</span>
                    <span>Fall 2022</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Leave of Absence:</span>
                    <span>Not Provided</span>
                  </div>
                </div>
                {/* </divclassName=> */}
              </div>
            </div>

            <div className="Additional-info-Container">

<StudentAdditionalInfo />
            </div>
          </div>
        )}

        {activeButton === "subjects" && (
          <div className="subject-container">
            {" "}
            {/* Make sure this class name matches the one in your CSS */}
            <h2>Subjects</h2>
            <ul>
              {subjects.map((subject) => (
                <li key={subject._id}>
                  <strong>{subject.name}</strong>: {subject.description}
                  <div>topics: {subject.topics}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeButton === "yearSem" && (
          <div className="year-sem-container">
            {" "}
            {/* Make sure this class name matches the one in your CSS */}
            <h2>Year Semesters</h2>
            <ul>
              {yearSems.map((yearSem) => (
                <li
                  key={yearSem._id}
                >{`Year ${yearSem.year}, Semester ${yearSem.sem}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;
