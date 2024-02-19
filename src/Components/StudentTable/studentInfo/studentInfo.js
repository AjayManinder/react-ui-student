import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../App";
import "./studentInfo.css"; // Make sure the path to your CSS file is correct
import { FiAlignRight } from "react-icons/fi";
import StudentAdditionalInfo from "./studentAdditionalInfo"; // Make sure the path to your component is correct
import docx from '../../../docs/React.docx';
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
            src={studentDetails.imageUrl}
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
                    <span>{studentDetails.studentBioDetails?.level}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Class:</span>
                    <span>{studentDetails.studentBioDetails?.class}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Status:</span>
                    <span>{studentDetails.studentBioDetails?.status}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Student Type:</span>
                    <span>{studentDetails.studentBioDetails?.studentType}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Residency:</span>
                    <span>{studentDetails.studentBioDetails?.residency}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Campus:</span>
                    <span>{studentDetails.studentBioDetails?.campus}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>First Term Attended:</span>
                    <span>{studentDetails.studentBioDetails?.firstTermAttended}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Matriculated Term:</span>
                    <span>{studentDetails.studentBioDetails?.matriculatedTerm}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Last Term Attended:</span>
                    <span>{studentDetails.studentBioDetails?.lastTermAttended}</span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Leave of Absence:</span>
                    <span>{studentDetails.studentBioDetails?.leaveOfAbsence}</span>
                  </div>
                </div>
                {/* </divclassName=> */}
              </div>
            </div>

            <div className="Additional-info-Container">

<StudentAdditionalInfo studentDetails={studentDetails} />
            </div>
          </div>
        )}

        {activeButton === "subjects" && (
          <div >
            {" "}
            {/* Make sure this class name matches the one in your CSS */}
            <h2>Subjects</h2>
            <ul >
              {subjects.map((subject) => (
                <li key={subject._id} className="subject-container">
                 <div className="subjectName"> <strong>{subject.name}</strong>: {subject.description}  </div>
                  <div className="subjectTopic"><strong>topics</strong>: {subject.topics}</div>
                   <div className="subjectTopic"><strong>Credits</strong>: {subject.subjectCredits}</div>
                   <div className="subjectTopic"><a href={docx} download>Download Document</a></div>
                   
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
