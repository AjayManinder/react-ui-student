import React from 'react';
import axios from 'axios';
import {  FaTrash } from 'react-icons/fa';
const API_URL = process.env.REACT_APP_API_URL;
const DeleteStudent = ({ rollNo, deleteStudent }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/students/${rollNo}`);
      deleteStudent(rollNo);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <button className="edit-btn" onClick={handleDelete}><FaTrash/></button>
  );
};

export default DeleteStudent;
