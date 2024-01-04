import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [fetchedStudents, setFetchedStudents] = useState([]); // Store fetched data separately
  const [searchField, setSearchField] = useState('rollNo');
  const [searchTerm, setSearchTerm] = useState('');

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
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
