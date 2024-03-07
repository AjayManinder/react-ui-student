// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axiosInstance from './axiosConfig';

// const StudentContext = createContext();

// export const StudentProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axiosInstance.get('/students');
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   return (
//     <StudentContext.Provider value={{ students }}>
//       {children}
//     </StudentContext.Provider>
//   );
// };

// export const useStudentContext = () => {
//   return useContext(StudentContext);
// };