// UsersTable.jsx

import React, { useState, useEffect } from "react";
import "./usersTable.css";
import axiosInstance from "../../../axiosConfig";
import CreateUserForm from "../userForm/creatingUserForm";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(true);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loadingMessage">Loading...</div>;
  }

  if (error) {
    return <div className="errorMessage">Error fetching users.</div>;
  }

  return (
    <div className="usersTable">
      <CreateUserForm />
      <h1 className="tableTitle">Users</h1>
      <div className="tableContainer">
        <table className="userTable">
          <thead>
            <tr>
              <th className="tableHeader tableCell">ID</th>
              <th className="tableHeader tableCell">Role Name</th>
              <th className="tableHeader tableCell">Email</th>
              {/* <th className="tableHeader tableCell">Role</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="rowHover">
                <td className="tableCell">{user.user_id}</td>
                <td className="tableCell">{user.role_id.roleName}</td>
                <td className="tableCell">{user.email}</td>
                {/* <td className="tableCell">{user.role_id.role_id}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
