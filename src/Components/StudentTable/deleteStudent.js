import React from "react";
import axiosInstance from "../../axiosConfig";
import { FaTrash } from "react-icons/fa";

const DeleteStudent = ({ rollNo, deleteStudent }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/students/${rollNo}`);
      deleteStudent(rollNo);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <button className="edit-btn" onClick={handleDelete}>
      <FaTrash />
    </button>
  );
};

export default DeleteStudent;
