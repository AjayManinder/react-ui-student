import React, { useState, useEffect } from 'react';

const StudentTable = () => {

  const [students, setStudents] = useState([]);

  // Fetching all students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/students');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);


  // Sample student data for demonstration
  // const [students, setStudents] = useState([
  //   { rollNo: 1, name: 'Ajay', percentage: '80.0', branch : 'CSE'},
  //   { rollNo: 2, name: 'Sunny', percentage: '96.0', branch : 'CSE'},
  //   { rollNo: 3, name: 'Alice', percentage: '67.5', branch : 'EEE'},
  //   { rollNo: 4, name: 'Maninder', percentage: '86.8', branch : 'ECE'},
  //   { rollNo: 5, name: 'Alice', percentage: '76.7', branch : 'CSE'},
  //   // Add more student objects as needed
  // ]);

  return (
    <div>
      <h2>Student Table</h2>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
