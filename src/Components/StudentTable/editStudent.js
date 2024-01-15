import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;
const Student_EP = process.env.REACT_APP_Student_Endpoint;
const EditStudent = ({ studentData, updateStudent, closeModal }) => {
  const [editedStudent, setEditedStudent] = useState(studentData);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setEditedStudent(studentData);
  }, [studentData]);

  const handleEditStudent = async () => {
    try {
      if (!editedStudent.rollNo || !editedStudent.name || !editedStudent.percentage || !editedStudent.branch) {
        setError('All fields are required');
        return;
      }

      await axios.put(`${API_URL}://${React_Host}:${React_Port}/${Student_EP}/${editedStudent.rollNo}`, editedStudent);
      updateStudent(editedStudent);
      setShowModal(false);
      closeModal(); // Close modal in the parent component
    } catch (error) {
      setError('Error updating student');
      console.error('Error updating student:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError('');
    setEditedStudent(studentData);
    closeModal(); // Close modal in the parent component
  };


  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Edit Student</h2>
            <input
              type="text"
              value={editedStudent.rollNo}
              onChange={(e) => setEditedStudent({ ...editedStudent, rollNo: e.target.value })}
              placeholder="Roll No"
            />
            <input
              type="text"
              value={editedStudent.name}
              onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="text"
              value={editedStudent.percentage}
              onChange={(e) => setEditedStudent({ ...editedStudent, percentage: e.target.value })}
              placeholder="Percentage"
            />
            <input
              type="text"
              value={editedStudent.branch}
              onChange={(e) => setEditedStudent({ ...editedStudent, branch: e.target.value })}
              placeholder="Branch"
            />
            {/* Other input fields for name, percentage, branch */}
            <button onClick={handleEditStudent}>Update</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
