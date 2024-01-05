import React, { useState } from 'react';
import axios from 'axios';

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
      // Validate fields (you can add more validation as needed)
      if (!newStudent.rollNo || !newStudent.name || !newStudent.percentage || !newStudent.branch) {
        setError('All fields are required');
        return;
      }

      const response = await axios.post('http://localhost:5000/students', newStudent);
      addStudent(response.data);
      setShowModal(false);
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
      <button onClick={() => setShowModal(true)}>Add Student</button>

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
