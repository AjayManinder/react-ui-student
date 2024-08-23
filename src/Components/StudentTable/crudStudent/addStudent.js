import React, { useState } from "react";
import "./addStudent.css";
import axiosInstance from "../../../axiosConfig";

const AddStudent = ({ addStudent }) => {
  const [newStudent, setNewStudent] = useState({
    rollNo: "",
    name: "",
    percentage: "",
    branch: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddStudent = async () => {
    try {
      if (
        !newStudent.rollNo ||
        !newStudent.name ||
        !newStudent.percentage ||
        !newStudent.branch
      ) {
        setError("All fields are required");
        return;
      }

      const response = await axiosInstance.post("/students", newStudent);
      addStudent(response.data);
      setShowModal(false);
      setNewStudent({
        // Clear the fields after successful addition
        rollNo: "",
        name: "",
        percentage: "",
        branch: "",
      });
      setError(""); // Reset error message
    } catch (error) {
      setError("Error adding student");
      console.error("Error adding student:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError("");
    setNewStudent({ rollNo: "", name: "", percentage: "", branch: "" });
  };

  return (
    <div>
      <button className="buttonModal" onClick={() => setShowModal(true)}>
        Add Student
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Add Student</h2>
            <label>Roll Number</label>
            <input
              type="text"
              value={newStudent.rollNo}
              onChange={(e) =>
                setNewStudent({ ...newStudent, rollNo: e.target.value })
              }
              placeholder="Roll No"
            />
            <label>Name</label>
            <input
              type="text"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              placeholder="Name"
            />
            <label>Percentage</label>
            <input
              type="text"
              value={newStudent.percentage}
              onChange={(e) =>
                setNewStudent({ ...newStudent, percentage: e.target.value })
              }
              placeholder="Percentage"
            />
            <label>Branch</label>
            <input
              type="text"
              value={newStudent.branch}
              onChange={(e) =>
                setNewStudent({ ...newStudent, branch: e.target.value })
              }
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
