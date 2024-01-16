import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './addStudent';
import EditStudent from './editStudent';
import DeleteStudent from './deleteStudent';
import { FaEdit } from 'react-icons/fa';
import './studentTable.css';

const API_URL = process.env.REACT_APP_API_URL;
const React_Host = process.env.REACT_APP_React_Host;
const React_Port = process.env.REACT_APP_React_Port;
const Student_EP = process.env.REACT_APP_Student_Endpoint;

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [fetchedStudents, setFetchedStudents] = useState([]);
  const [searchField, setSearchField] = useState('rollNo');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [openDetails, setOpenDetails] = useState({});
  const [activeTab, setActiveTab] = useState('yearSemIds');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleDetails = (rollNo) => {
    setOpenDetails((prevOpenDetails) => ({
      ...prevOpenDetails,
      [rollNo]: !prevOpenDetails[rollNo],
    }));
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}://${React_Host}:${React_Port}/${Student_EP}`);
        setFetchedStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    setStudents(fetchedStudents.slice(indexOfFirstStudent, indexOfLastStudent));
  }, [currentPage, fetchedStudents, studentsPerPage]);

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
    setSelectedStudent(null);
  };

  const deleteStudent = (rollNo) => {
    const updatedStudents = students.filter((student) => student.rollNo !== rollNo);
    setStudents(updatedStudents);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '' || searchField.trim() === '') {
      // If search term or search field is empty, reset the search
      resetSearch();
    } else {
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
  
      setStudents(filteredStudents);
      setIsSearchActive(true);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearchActive(false);
    setCurrentPage(1);
  
    // Set students to the first page of fetchedStudents
    setStudents(fetchedStudents.slice(0, studentsPerPage));
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
        <table className="table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Percentage</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <React.Fragment key={student.rollNo}>
                <tr>
                  
                  <td> <button
                      className="btn-btn-link"
                      type="button"
                      onClick={() => toggleDetails(student.rollNo)}
                    >
                      {openDetails[student.rollNo] ? '^' : '>'}
                    </button>
                  {student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.percentage}</td>
                  <td>{student.branch}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => editStudent(student)}>
                      <FaEdit />
                    </button>
                    <DeleteStudent rollNo={student.rollNo} deleteStudent={deleteStudent} />
                  </td>
                </tr>
                {openDetails[student.rollNo] && (
                  <tr>
                    <td colSpan="6">
                      <div>
                        <div className="nav-tabs">
                          <button
                            className={`nav-link ${activeTab === 'yearSemIds' ? 'active' : ''}`}
                            onClick={() => handleTabChange('yearSemIds')}
                          >
                           Year
                          </button>
                          <button
                            className={`nav-link ${activeTab === 'subjectIds' ? 'active' : ''}`}
                            onClick={() => handleTabChange('subjectIds')}
                          >
                            Subject
                          </button>
                        </div>
                        <div>
                          {activeTab === 'yearSemIds' && (
                            <div className='content-tab'>
                              <div>
                              <strong>Year:</strong> {student.yearSemIds.length > 0 ? student.yearSemIds[0].year : ''}
                              </div>
                              <div>
                              <strong>Semester:</strong> {student.yearSemIds.length > 0 ? student.yearSemIds[0].sem : ''}
                              </div>
                              <div>
                                <strong>Status:</strong> {student.yearSemIds.length > 0 ? student.yearSemIds[0].status : ''}
                              </div>
                            </div>
                          )}
                          {activeTab === 'subjectIds' && (
                            <div>
                              
                              <div>
                              <strong>Subject ID:</strong> {student.subjectIds.length > 0 ? student.subjectIds[0].subID : ''}
                              </div>
                            <div>                              
                              <strong>Subject Name:</strong> {student.subjectIds.length > 0 ? student.subjectIds[0].name : ''}
                            </div>
                            <div>
                              <strong>Subject Description:</strong> {student.subjectIds.length > 0 ? student.subjectIds[0].description : ''}
                              </div>
                              <div>
                              <strong>Topics:</strong> {
    student.subjectIds.length > 0
      ? student.subjectIds
          .filter(item => item && item.topics) // Remove items without status
          .map(item => item.topics)
          .join(', ')
      : 'No status available'
  }
                              </div>
                            </div>
                            
                            
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(fetchedStudents.length / studentsPerPage)}
        >
          {">"}          
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
