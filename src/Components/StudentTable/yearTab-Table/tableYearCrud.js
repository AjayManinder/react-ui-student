// YearSemester.js

import React, { useState, useContext } from "react";
import axiosInstance from "../../../axiosConfig";
import "./tableYear.css";
import { Context } from "../../../App";
const TableYearCrud = ({ data, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useContext(Context);
  const handleEditClick = (e) => {
    setEditing(true);
    e.preventDefault();
  };
  const modelCloseEvent = (e) => {
    setEditing(false);
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      // Sending a PUT request to update the data on the server
      const response = await axiosInstance.put(
        `/yearsem/${data._id}`,
        editedData
      );

      // Logging the success message and updating the state
      console.log("YearSemester updated successfully:", response.data);
      setEditing(false);

      // Invoking the onEdit callback to update the parent component
      onEdit(editedData);
    } catch (error) {
      // Handling errors that might occur during the update process
      console.error("Error updating YearSemester:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div
      className={`year-semester-container ${
        isEditing ? "year-semester-edit-mode" : "year-semester-display-mode"
      }`}
    >
      {isEditing ? (
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={editedData.year}
            onChange={handleInputChange}
          />
          <label htmlFor="sem">Semester:</label>
          <input
            type="text"
            id="sem"
            name="sem"
            value={editedData.sem}
            onChange={handleInputChange}
          />
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={editedData.status}
            onChange={handleInputChange}
          />

          <button onClick={handleSaveClick}>Save</button>
          <button className="cancelButton" onClick={modelCloseEvent}>
            Close
          </button>
        </div>
      ) : (
        <div>
          <div>
            <strong>Year:</strong> {data.year}
          </div>
          <div>
            <strong>Semester:</strong> {data.sem}
          </div>
          <div>
            <strong>Status:</strong> {data.status}
          </div>
          {userDetails && userDetails.role_id.roleName === "admin" && (
            <button className="editButton" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TableYearCrud;
