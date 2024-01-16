import React, { useState } from 'react';
import axios from 'axios';
import './addStudent.css';
const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;
const Student_EP = process.env.REACT_APP_Student_Endpoint;

const AddStudent = ({ addStudent }) => {
  const [newStudent, setNewStudent] = useState({
    rollNo: '',
    name: '',
    percentage: '',
    branch: '',
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddStudent = async () => {
    try {
      if (!newStudent.rollNo || !newStudent.name || !newStudent.percentage || !newStudent.branch) {
        setError('All fields are required');
        return;
      }

      const response = await axios.post(`${API_URL}://${React_Host}:${React_Port}/${Student_EP}`, newStudent);
      addStudent(response.data);
      setShowModal(false);
      setNewStudent({ // Clear the fields after successful addition
        rollNo: '',
        name: '',
        percentage: '',
        branch: '',
      });
      setError(''); // Reset error message
    } catch (error) {
      setError('Error adding student');
      console.error('Error adding student:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError('');
    setNewStudent({ rollNo: '', name: '', percentage: '', branch: '' });
  };

  return (
    <div>
       <button className="buttonModal" onClick={() => setShowModal(true)}>Add Student</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Add Student</h2>
            <input
              type="text"
              value={newStudent.rollNo}
              onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
              placeholder="Roll No"
            />
             <input
              type="text"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="text"
              value={newStudent.percentage}
              onChange={(e) => setNewStudent({ ...newStudent, percentage: e.target.value })}
              placeholder="Percentage"
            />
            <input
              type="text"
              value={newStudent.branch}
              onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
              placeholder="Branch"
            />
            {/* Other input fields for name, percentage, branch */}
            <button onClick={handleAddStudent}>Add</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
