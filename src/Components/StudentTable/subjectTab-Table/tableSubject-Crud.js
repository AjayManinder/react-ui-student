// YearSemester.js

import React, { useState, useContext } from 'react';
import axiosInstance from '../../../axiosConfig';
import '../yearTab-Table/tableYear.css';
import { Context } from '../../../App';
const TableSubjectCrud = ({ data, onEditSubject }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedSubjectData, setSubjectEditedData] = useState({ ...data });
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useContext(Context);
  const handleEditClick = () => {
    setEditing(true);
  };
const modelCloseEvent = () => {
  setEditing(false);
  }

  const handleSaveClick = async () => {
    try {
      // Sending a PUT request to update the data on the server
      const response = await axiosInstance.put(`/subjects/${data._id}`, editedSubjectData);
      
      // Logging the success message and updating the state
      console.log('Subject updated successfully:', response.data);
      setEditing(false);
      
      // Invoking the onEdit callback to update the parent component
      onEditSubject(editedSubjectData);
    } catch (error) {
      // Handling errors that might occur during the update process
      console.error('Error updating YearSemester:', error);
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'topics' ? value.split(',').map(topic => topic.trim()) : value;
    setSubjectEditedData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };
  
  return (
    <div className={`year-semester-container ${isEditing ? 'year-semester-edit-mode' : 'year-semester-display-mode'}`}>
      {isEditing ? (
        <div>
          <label htmlFor="year">Subject Id:</label>
          <input type="text" id="subID" name="subID" value={editedSubjectData.subID} onChange={handleInputChange} />
          <label htmlFor="sem">Subject Name:</label>
          <input type="text" id="name" name="name" value={editedSubjectData.name} onChange={handleInputChange} />
          <label htmlFor="status">Description:</label>
          <input type="text" id="description" name="description" value={editedSubjectData.description} onChange={handleInputChange} />
          <label htmlFor="status">Topics:</label>
          <input type="text" id="topics" name="topics" value={editedSubjectData.topics.join(', ')} onChange={handleInputChange} />
          <button onClick={handleSaveClick}>Save</button>
          <button className='cancelButton' onClick={modelCloseEvent}>Close</button>
        </div>
      ) : (
        <div>
          <div>
            <strong>Subject Id::</strong> {data.subID}
          </div>
          <div>
            <strong>Subject Name:</strong> {data.name}
          </div>
          <div>
            <strong>Description:</strong> {data.description}
          </div>
          <div>
          <strong>Topics:</strong> {data.topics.join(', ')}
          </div>
          {userDetails && userDetails.role_id.roleName === 'admin' && (
          <button className= "editButton" onClick={handleEditClick}>Edit</button> )}

        </div>
      )}
    </div>
  );
};

export default TableSubjectCrud;
