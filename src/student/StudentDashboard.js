import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectClick = (subject) => {
    navigate(`/student/quiz/${subject}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <div className="student-dashboard-wrapper">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="dashboard-title">Welcome, Student!</h1>
        <motion.button 
          className="logout-btn" 
          onClick={handleLogout} 
          whileHover={{ scale: 1.05 }}
        >
          Logout
        </motion.button>
      </motion.div>

      <motion.div 
        className="dashboard-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div className="card stat-card" whileHover={{ scale: 1.05 }}>
          <h3>Total Quizzes</h3>
          <p>{subjects.length}</p>
        </motion.div>

        <motion.div className="card stat-card" whileHover={{ scale: 1.05 }}>
          <h3>Completed</h3>
          <p>5</p>
        </motion.div>

        <motion.div className="card stat-card" whileHover={{ scale: 1.05 }}>
          <h3>Upcoming</h3>
          <p>2</p>
        </motion.div>

        <motion.div className="card stat-card" whileHover={{ scale: 1.05 }}>
          <h3>In Progress</h3>
          <p>1</p>
        </motion.div>
      </motion.div>

      <motion.h2 
        className="subject-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Quiz Subjects
      </motion.h2>

      <div className="subject-list">
        {subjects.map((subject, index) => (
          <motion.button
            key={index}
            onClick={() => handleSubjectClick(subject)}
            className="subject-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {subject}
          </motion.button>
        ))}
      </div>

      <motion.button 
        className="coding-btn"
        onClick={() => navigate("/student/dashboard/editor")}
        whileHover={{ scale: 1.05 }}
      >
        Coding Questions
      </motion.button>
    </div>
  );
};

export default StudentDashboard;
