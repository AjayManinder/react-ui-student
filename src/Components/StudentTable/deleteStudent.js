import React from 'react';
import axios from 'axios';
import {  FaTrash } from 'react-icons/fa';
const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;
const Student_EP = process.env.REACT_APP_Student_Endpoint;
const DeleteStudent = ({ rollNo, deleteStudent }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}://${React_Host}:${React_Port}/${Student_EP}${rollNo}`);
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
