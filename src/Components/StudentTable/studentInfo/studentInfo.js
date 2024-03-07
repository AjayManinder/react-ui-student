import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../App";
import "./studentInfo.css"; // Make sure the path to your CSS file is correct
import { FiAlignRight } from "react-icons/fi";
import StudentAdditionalInfo from "./studentAdditionalInfo"; // Make sure the path to your component is correct
import docx from "../../../docs/React.docx";
import Calendar from 'react-calendar';
import axiosInstance from "../../../axiosConfig";
// import 'react-calendar/dist/Calendar.css';
const StudentInfo = () => {
  const [studentDetails, setStudentDetails] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [yearSems, setYearSems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useContext(Context);
  const [activeButton, setActiveButton] = useState("general");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);

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
  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', image);
  
    try {
      const response = await axiosInstance.put(`/students/upload-image/${studentDetails.rollNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Assuming the response contains the URL of the uploaded image
      const imageUrl = response.data.imageUrl;
  
      // Update studentDetails with the new image URL
      setStudentDetails(prevStudentDetails => ({
        ...prevStudentDetails,
        imageUrl: imageUrl
      }));
  
      alert('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    }
  };


  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/students/delete-image/${studentDetails.rollNo}`);
      alert('Image deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete image');
    }
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onChangeC = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="student-info-container">
      <div className="desktop-links-button">
        <div className="button-container-desktop">
        <img
        className="profile-image"
        src={studentDetails.imageUrl}
        alt="Profile Pic"
      />
      <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDelete}>Delete</button>
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
              activeButton === "grades" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("grades")}
          >
            Grades
          </button>
          <button
            className={`info-button ${
              activeButton === "subjectsEnrolled" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("subjectsEnrolled")}
          >
            Subjects Enrolled
          </button>
          <button
            className={`info-button ${
              activeButton === "financialInfo" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("financialInfo")}
          >
            Financial Info
          </button>
          <button
            className={`info-button ${
              activeButton === "transcripts" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("transcripts")}
          >
            Transcripts
          </button>
          <button
            className={`info-button ${
              activeButton === "attendence" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("attendence")}
          >
            Attendence
          </button>
          <button
            className={`info-button ${
              activeButton === "reportCard" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("reportCard")}
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
                      {/* {studentDetails.rollNo} */}
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
                    <span>
                      {studentDetails.studentBioDetails?.firstTermAttended}
                    </span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Matriculated Term:</span>
                    <span>
                      {studentDetails.studentBioDetails?.matriculatedTerm}
                    </span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Last Term Attended:</span>
                    <span>
                      {studentDetails.studentBioDetails?.lastTermAttended}
                    </span>
                  </div>
                  <div className="student-details-text-info">
                    <span>Leave of Absence:</span>
                    <span>
                      {studentDetails.studentBioDetails?.leaveOfAbsence}
                    </span>
                  </div>
               
                {/* </divclassName=> */}
              </div>
            </div>

            <div className="Additional-info-Container">
              <StudentAdditionalInfo studentDetails={studentDetails} />
            </div>
          
               <Calendar
        onChange={onChangeC}
        value={date}
        // Other props can be added here for customization
      />
            </div>
         
        )}

        {activeButton === "subjects" && (
          <div>
            {" "}
            {/* Make sure this class name matches the one in your CSS */}
            <h2>Subjects</h2>
            <ul>
              {subjects.map((subject) => (
                <li key={subject._id} className="subject-container">
                  <div className="subjectName">
                    {" "}
                    <strong>{subject.name}</strong>: {subject.description}{" "}
                  </div>
                  <div className="subjectTopic">
                    <strong>topics</strong>: {subject.topics}
                  </div>
                  <div className="subjectTopic">
                    <strong>Credits</strong>: {subject.subjectCredits}
                  </div>
                  <div className="subjectTopic">
                    <a href={docx} download>
                      Download Document
                    </a>
                  </div>
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
        {activeButton === "reportCard" && (
          <div className="reportCard-container">
           
          </div>
        )}
        
      </div>
    </div>
  );
};

export default StudentInfo;
