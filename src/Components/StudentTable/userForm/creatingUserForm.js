import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axiosConfig";
import "./creatingUserForm.css"; // Import external CSS file

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    email: "",
    password: "",
    role_id: "",
    rollNo: "",
    name: "",
    percentage: "",
    branch: "",
    selectedSubjects: [],
    selectedYearSem: "",
    admin_id: "",
    adminName: "",
    roles: [],
    subjects: [],
    yearSemesters: [],
    errors: {
      user_id: "",
      email: "",
    },
  });

  const [showData, setShowData] = useState(false);

  const fetchData = async () => {
    try {
      const [rolesRes, subjectsRes, yearSemestersRes] = await Promise.all([
        axiosInstance.get("/roles"),
        axiosInstance.get("/subjects"),
        axiosInstance.get("/yearsem"),
      ]);
      setFormData((prevState) => ({
        ...prevState,
        roles: rolesRes.data,
        subjects: subjectsRes.data,
        yearSemesters: yearSemestersRes.data,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let errors = { ...formData.errors };

    if (!value.trim()) {
      errors[name] = `Please enter ${
        name === "user_id"
          ? "User ID"
          : name === "rollNo"
          ? "Roll Number"
          : name
      }.`;
    } else {
      // Reset error if the input is not empty
      errors[name] = "";

      // Check for duplicate user ID, email, or roll number locally
      if (
        name === "user_id" &&
        formData.roles.some((role) => role.user_id === value)
      ) {
        errors[name] = "User ID already exists.";
      }
      if (
        name === "email" &&
        formData.roles.some((role) => role.email === value)
      ) {
        errors[name] = "Email already exists.";
      }
      // if (name === 'rollNo' && formData.students.some(student => student.rollNo === value)) {
      //   errors[name] = 'Roll Number already exists.';
      // }
    }

    if (type === "select-multiple") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedOptions,
        errors: errors,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        errors: errors,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(formData.errors).some((error) => error);
    if (hasErrors) {
      alert("Please fix all errors before submitting.");
      return;
    }
    let newUserResponse;
    try {
      newUserResponse = await axiosInstance.post("/register", {
        user_id: formData.user_id,
        email: formData.email,
        password: formData.password,
        role_id: formData.role_id,
      });

      let responseData;
      if (formData.role_id === "65b1e345fef8a8c6c613ad76") {
        responseData = await axiosInstance.post("/students", {
          rollNo: formData.rollNo,
          name: formData.name,
          percentage: formData.percentage,
          branch: formData.branch,
          subjectIds: formData.selectedSubjects,
          yearSemIds: [formData.selectedYearSem],
          userId: newUserResponse.data.userId,
        });
      } else if (formData.role_id === "65b1e320fef8a8c6c613ad74") {
        responseData = await axiosInstance.post("/teachers", {
          teacherID: formData.teacherID,
          teacherName: formData.teacherName,
          subjectIds: formData.selectedSubjects,
          user_id: newUserResponse.data.userId,
        });
      } else if (formData.role_id === "65b1e300fef8a8c6c613ad72") {
        responseData = await axiosInstance.post("/admins", {
          admin_id: formData.admin_id,
          adminName: formData.adminName,
          user_id: newUserResponse.data.userId,
        });
      }

      console.log("New data created:", responseData.data);
      setShowData(true);
      setFormData({
        user_id: "",
        email: "",
        password: "",
        role_id: "",
        rollNo: "",
        name: "",
        percentage: "",
        branch: "",
        teacherID: "",
        teacherName: "",
        selectedSubjects: [],
        selectedYearSem: "",
        roles: formData.roles,
        subjects: formData.subjects,
        yearSemesters: formData.yearSemesters,
        errors: {
          user_id: "",
          email: "",
        },
      });
      setTimeout(() => {
        setShowData(false);
      }, 10000);
      alert("User and data created successfully.");
    } catch (error) {
      console.error("Error creating user or data:", error);
      // If there was an error creating the teacher, delete the user record
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Invalid teacher details"
      ) {
        console.log("Deleting user record...");
        await axiosInstance.delete(`/users/${newUserResponse.data.userId}`);
      }
      alert("An error occurred while creating user or data.");
    }
  };
  return (
    <>
    <form onSubmit={handleSubmit} className="create-user-form">
      <label>
        User ID :
        <input
          type="number"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          placeholder="User ID"
          required
        />
        {formData.errors.user_id && (
          <span className="error">{formData.errors.user_id}</span>
        )}
      </label>
      <label>
        Email :
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {formData.errors.email && (
          <span className="error">{formData.errors.email}</span>
        )}
      </label>
      <label>
        Password :
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <select
        name="role_id"
        value={formData.role_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        {formData.roles.map((role) => (
          <option key={role._id} value={role._id}>
            {role.roleName}
          </option>
        ))}
      </select>

      {formData.role_id === "65b1e345fef8a8c6c613ad76" && (
        <>
          <label>
            Roll No :
            <input
              type="number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="Roll No"
            />
            {formData.errors.rollNo && (
              <span className="error">{formData.errors.rollNo}</span>
            )}
          </label>
          <label>
            Name :
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </label>
          <label>
            Percentage :
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              placeholder="Percentage"
            />
          </label>
          <label>
            Branch :
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Branch"
            />
          </label>
          <select
            multiple
            name="selectedSubjects"
            value={formData.selectedSubjects}
            onChange={handleChange}
          >
            <option value="">Select Subjects</option>
            {formData.subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          {formData.selectedSubjects.length > 0 && (
            <div>
              <p>Selected Subjects:</p>
              <ul>
                {formData.selectedSubjects.map((subjectId) => (
                  <li key={subjectId}>
                    {
                      formData.subjects.find(
                        (subject) => subject._id === subjectId
                      )?.name
                    }
                  </li>
                ))}
              </ul>
            </div>
          )}
          <label>
            Select Year/Semester
            <select
              name="selectedYearSem"
              value={formData.selectedYearSem}
              onChange={handleChange}
            >
              <option value="">Select Year/Semester</option>
              {formData.yearSemesters.map((yearSem) => (
                <option
                  key={yearSem._id}
                  value={yearSem._id}
                >{`Year ${yearSem.year}, Semester ${yearSem.sem}`}</option>
              ))}
            </select>
          </label>
        </>
      )}
      {formData.role_id === "65b1e320fef8a8c6c613ad74" && (
        <>
          <label>
            Teacher ID:
            <input
              type="string"
              name="teacherID"
              value={formData.teacherID}
              onChange={handleChange}
              placeholder="Teacher ID"
            />
          </label>
          <label>
            Teacher Name:
            <input
              type="string"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              placeholder="Teacher Name"
            />
          </label>
          <select
            multiple
            name="selectedSubjects"
            value={formData.selectedSubjects}
            onChange={handleChange}
          >
            <option value="">Select Subjects</option>
            {formData.subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          {formData.selectedSubjects.length > 0 && (
            <div>
              <p>Selected Subjects:</p>
              <ul>
                {formData.selectedSubjects.map((subjectId) => (
                  <li key={subjectId}>
                    {
                      formData.subjects.find(
                        (subject) => subject._id === subjectId
                      )?.name
                    }
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {formData.role_id === "65b1e300fef8a8c6c613ad72" && (
        <>
          <label>
            Admin ID:
            <input
              type="number"
              name="admin_id"
              value={formData.admin_id}
              onChange={handleChange}
              placeholder="Admin ID"
            />
          </label>
          <label>
            Admin Name:
            <input
              type="string"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="admin Name"
            />
          </label>
        </>
      )}

      <button type="submit">Submit</button>
    </form>
     {showData && (
      <div className="data-section">
       
        <p>User ID: {formData.user_id}</p>
        <p>Email: {formData.email}</p>
      {/* Display the newly created data here */}
      </div>
    )}
    </>
  );
};

export default CreateUserForm;
