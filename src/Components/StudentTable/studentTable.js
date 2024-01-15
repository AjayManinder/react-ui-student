import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './addStudent';
import EditStudent from './editStudent';
import DeleteStudent from './deleteStudent';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './studentTable.css';
const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;
const Student_EP = process.env.REACT_APP_Student_Endpoint;
const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [fetchedStudents, setFetchedStudents] = useState([]); // Store fetched data separately
  const [searchField, setSearchField] = useState('rollNo');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false); // Flag to track search status

  useEffect(() => {
    // Function to fetch students
    const fetchStudents = async () => {
      try {
        // console.log(API_URL);
        // console.log(React_Host);
        // console.log(React_Port);
        // console.log(Student_EP);
        const response = await axios.get(`${API_URL}://${React_Host}:${React_Port}/${Student_EP}`);
       
        setStudents(response.data);
        setFetchedStudents(response.data); // Store fetched data separately
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudentList = (updatedStudent) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNo === updatedStudent.rollNo) {
        return updatedStudent;
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const editStudent = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null); // Reset selected student state
  };

  const deleteStudent = (rollNo) => {
    const updatedStudents = students.filter((student) => student.rollNo !== rollNo);
    setStudents(updatedStudents);
  };

  const handleSearch = () => {
    // Filter students based on search criteria
    const filteredStudents = fetchedStudents.filter((student) => {
      if (searchField === 'rollNo') {
        return student.rollNo.toString().includes(searchTerm);
      } else if (searchField === 'name') {
        return student.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchField === 'percentage') {
        return student.percentage.toString().includes(searchTerm);
      }
      return false;
    });

    // Update the displayed students with filtered results
    setStudents(searchTerm ? filteredStudents : fetchedStudents);
    setIsSearchActive(!!searchTerm); // Set search flag based on the presence of search term
  };

  const resetSearch = () => {
    setSearchTerm(''); // Clear search term
    setStudents(fetchedStudents); // Reset to original student list
    setIsSearchActive(false); // Reset search flag
  };

  return (
    <div className='TableContainer'>
      <div className='searchDropdown'>
        <select onChange={(e) => setSearchField(e.target.value)}>
          <option value="rollNo">Roll No</option>
          <option value="name">Name</option>
          <option value="percentage">Percentage</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search by ${searchField}`}
        />
        <button onClick={handleSearch}>Search</button>
        {isSearchActive && <button onClick={resetSearch}>Reset</button>}
      </div>
      <div className='container1'>
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Percentage</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Subject ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNo}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.percentage}</td>
                <td>{student.branch}</td>
                <td>{student.yearSemIds.length > 0 ? student.yearSemIds[0].year : ''}</td>
                <td>{student.subjectIds.length > 0 ? student.subjectIds[0].subID : ''}</td>
                <td>{student.yearSemIds.length > 0 ? student.yearSemIds[0].status : ''}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => editStudent(student)}>
                    <FaEdit />
                  </button>
                  <DeleteStudent rollNo={student.rollNo} deleteStudent={deleteStudent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddStudent addStudent={addStudent} />
      {selectedStudent && (
        <EditStudent
          studentData={selectedStudent}
          updateStudent={updateStudentList}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default StudentTable;
