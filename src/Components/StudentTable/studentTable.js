import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './addStudent';
import EditStudent from './editStudent';
import DeleteStudent from './deleteStudent';
const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [fetchedStudents, setFetchedStudents] = useState([]); // Store fetched data separately
  const [searchField, setSearchField] = useState('rollNo');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
    // Function to fetch students
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');
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
  };

  return (
    <div>
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

      {/* Render your table using the 'students' state */}
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Percentage</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.percentage}</td>
              <td>{student.branch}</td>
              <button onClick={() => editStudent(student)}>Edit</button>
              <DeleteStudent rollNo={student.rollNo} deleteStudent={deleteStudent} />

            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <EditStudent
          studentData={selectedStudent}
          updateStudent={updateStudentList}
          closeModal={closeModal}
        />
      )}
      <AddStudent addStudent={addStudent} />
      {/* <DeleteStudent studentId=studentId deleteStudent={deleteStudent} /> */}
    </div>
  );
};

export default StudentTable;
