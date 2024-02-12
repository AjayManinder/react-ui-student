import React, { useState } from 'react';
import './studentInfo.css';
function StudentAdditionalInfo() {
  const [selectedTab, setSelectedTab] = useState('Primary');

  return (
    <div>
      <h2>CURRICULUM, HOURS & GPA</h2>
      <div>
        <button onClick={() => setSelectedTab('Primary')}>Primary</button>
        <button onClick={() => setSelectedTab('Secondary')}>Secondary</button>
        <button onClick={() => setSelectedTab('Hours & GPA')}>Hours & GPA</button>
      </div>
      <div>
        {selectedTab === 'Primary' && (
          <div>
            <div className="student-details-text-info">
              <span>Degree:</span>
              <span>Master of Science</span>
            </div>
            <div className="student-details-text-info">
              <span>Study Path:</span>
              <span>Not Provided</span>
            </div>
            <div className="student-details-text-info">
              <span>Level:</span>
              <span>Graduate</span>
            </div>
            <div className="student-details-text-info">
              <span>Program:</span>
              <span>MS Computer Science</span>
            </div>
            <div className="student-details-text-info">
              <span>College:</span>
              <span>Health, Science and Technology</span>
            </div>
            <div className="student-details-text-info">
              <span>Major:</span>
              <span>Computer Science</span>
            </div>
            <div className="student-details-text-info">
              <span>Department:</span>
              <span>Computer Science</span>
            </div>
            <div className="student-details-text-info">
              <span>Concentration:</span>
              <span>Not Provided</span>
            </div>
            <div className="student-details-text-info">
              <span>Minor:</span>
              <span>Not Provided</span>
            </div>
            <div className="student-details-text-info">
              <span>Admit Type:</span>
              <span>Standard</span>
            </div>
            <div className="student-details-text-info">
              <span>Admit Term:</span>
              <span>Fall 2021</span>
            </div>
            <div className="student-details-text-info">
              <span>Catalog Term:</span>
              <span>Fall 2021</span>
            </div>
          </div>
        )}
        {selectedTab === 'Secondary' && (
          <div>
            {/* Secondary tab content goes here */}
            {/* You can leave this section empty for now */}
          </div>
        )}
        {selectedTab === 'Hours & GPA' && (
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
