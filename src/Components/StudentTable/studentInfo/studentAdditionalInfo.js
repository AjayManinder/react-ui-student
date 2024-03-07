import React, { useState } from "react";
import "./studentInfo.css";

function StudentAdditionalInfo({ studentDetails }) {
  const [selectedTab, setSelectedTab] = useState("Primary");

  return (
    <div>
      <h2>CURRICULUM, HOURS & GPA</h2>
      <div>
        <button onClick={() => setSelectedTab("Primary")}>Primary</button>
        <button onClick={() => setSelectedTab("Secondary")}>Secondary</button>
        <button onClick={() => setSelectedTab("Hours & GPA")}>
          Hours & GPA
        </button>
      </div>
      <div>
        {selectedTab === "Primary" && (
          <div>
            <div className="student-details-text-info">
              <span>Degree:</span>
              <span>{studentDetails.curriculumPrimary?.degree}</span>
            </div>
            <div className="student-details-text-info">
              <span>Study Path:</span>
              <span>{studentDetails.curriculumPrimary?.studyPath}</span>
            </div>
            <div className="student-details-text-info">
              <span>Level:</span>
              <span>{studentDetails.curriculumPrimary?.level}</span>
            </div>
            <div className="student-details-text-info">
              <span>Program:</span>
              <span>{studentDetails.curriculumPrimary?.program}</span>
            </div>
            <div className="student-details-text-info">
              <span>College:</span>
              <span>{studentDetails.curriculumPrimary?.college}</span>
            </div>
            <div className="student-details-text-info">
              <span>Major:</span>
              <span>{studentDetails.curriculumPrimary?.major}</span>
            </div>
            <div className="student-details-text-info">
              <span>Department:</span>
              <span>{studentDetails.curriculumPrimary?.department}</span>
            </div>
            <div className="student-details-text-info">
              <span>Concentration:</span>
              <span>{studentDetails.curriculumPrimary?.concentration}</span>
            </div>
            <div className="student-details-text-info">
              <span>Minor:</span>
              <span>{studentDetails.curriculumPrimary?.minor}</span>
            </div>
            <div className="student-details-text-info">
              <span>Admit Type:</span>
              <span>{studentDetails.curriculumPrimary?.admitType}</span>
            </div>
            <div className="student-details-text-info">
              <span>Admit Term:</span>
              <span>{studentDetails.curriculumPrimary?.admitTerm}</span>
            </div>
            <div className="student-details-text-info">
              <span>Catalog Term:</span>
              <span>{studentDetails.curriculumPrimary?.catalogTerm}</span>
            </div>
          </div>
        )}
        {selectedTab === "Secondary" && (
          <div>
            {/* Secondary tab content goes here */}
            {/* You can leave this section empty for now */}
          </div>
        )}
        {selectedTab === "Hours & GPA" && (
          <div>
            {/* Hours & GPA tab content goes here */}
            {/* You can leave this section empty for now */}
          </div>
        )}
      </div>
      {/* Add buttons for selecting tabs */}
    </div>
  );
}

export default StudentAdditionalInfo;
