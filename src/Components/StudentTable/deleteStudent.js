import React from 'react';
import axios from 'axios';

const DeleteStudent = ({ rollNo, deleteStudent }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/students/${rollNo}`);
      deleteStudent(rollNo);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteStudent;
