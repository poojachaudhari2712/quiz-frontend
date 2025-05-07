import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminStudent.css';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:5000/api/admin/students", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="admin-students-container">
      <h2>Registered Students</h2>
      {students.length === 0 ? (
        <p>No registered students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.ip || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminStudents;
