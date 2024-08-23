import React, { useState, useEffect } from "react";
import axios from "axios";
import "./crudStudent/addStudent.css";
const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL;
const API_HOST = process.env.REACT_APP_API_HOST;
const Student_EP = process.env.REACT_APP_Student_Endpoint;
const EditStudent = ({ studentData, updateStudent, closeModal }) => {
  //Props in the form of studentData, updateStudent, closeModal  cchildren of StudentTable.js
  const [editedStudent, setEditedStudent] = useState(studentData);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setEditedStudent(studentData);
  }, [studentData]);

  const handleEditStudent = async () => {
    try {
      if (
        !editedStudent.rollNo ||
        !editedStudent.name ||
        !editedStudent.percentage ||
        !editedStudent.branch
      ) {
        setError("All fields are required");
        return;
      }

      await axios.put(
        `${API_PROTOCOL}://${API_HOST}/${Student_EP}/${editedStudent.rollNo}`,
        editedStudent
      );
      updateStudent(editedStudent);
      setShowModal(false);
      closeModal(); // Close modal in the parent component
    } catch (error) {
      setError("Error updating student");
      console.error("Error updating student:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError("");
    setEditedStudent(studentData);
    closeModal(); // Close modal in the parent component
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Edit Student</h2>
            <label>Roll Number:</label>
            <input
              type="text"
              value={editedStudent.rollNo}
              onChange={(e) =>
                setEditedStudent({ ...editedStudent, rollNo: e.target.value })
              }
              placeholder="Roll No"
            />
            <label>Name:</label>
            <input
              type="text"
              value={editedStudent.name}
              onChange={(e) =>
                setEditedStudent({ ...editedStudent, name: e.target.value })
              }
              placeholder="Name"
            />
            <label>Percentage:</label>
            <input
              type="text"
              value={editedStudent.percentage}
              onChange={(e) =>
                setEditedStudent({
                  ...editedStudent,
                  percentage: e.target.value,
                })
              }
              placeholder="Percentage"
            />
            <label>Branch:</label>
            <input
              type="text"
              value={editedStudent.branch}
              onChange={(e) =>
                setEditedStudent({ ...editedStudent, branch: e.target.value })
              }
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
