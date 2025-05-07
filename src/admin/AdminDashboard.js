import React from "react";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  
  const quizId = "YOUR_QUIZ_ID";  

  const handleAddQuiz = () => {
    navigate("/admin/add-quiz");
  };

  const handleEditQuiz = () => {
    navigate("/admin/edit-quiz");
  };

  const handleViewRegisteredStudents = () => {
    navigate("/admin/registered-students");
  };

  const handleViewLeaderboard = () => {
    navigate(`/admin/leaderboard`);  
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <h2 className="admin-dashboard-title">Admin Dashboard</h2>
        <div className="admin-dashboard-buttons">
          <button onClick={handleAddQuiz} className="admin-dashboard-btn add-btn">
            Add New Quiz
          </button>
          <button onClick={handleEditQuiz} className="admin-dashboard-btn edit-btn">
            Edit Quiz
          </button>
          <button 
            onClick={handleViewRegisteredStudents} 
            className="admin-dashboard-btn students-btn"
          >
            View Registered Students
          </button>
          <button 
            onClick={handleViewLeaderboard} 
            className="admin-dashboard-btn leaderboard-btn"
          >
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
