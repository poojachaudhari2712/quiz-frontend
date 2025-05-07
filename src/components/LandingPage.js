import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <motion.div
        className="landing-left"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1>
          Welcome to the <span>Quiz Platform</span>
        </h1>
        <p>Test your knowledge. Compete with others. Learn more every day!</p>
      </motion.div>

      <motion.div
        className="landing-right"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.button
          className="btn login"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
        >
          🔐 Login
        </motion.button>
        <motion.button
          className="btn register"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/register')}
        >
          📝 Register
        </motion.button>
      </motion.div>

      <motion.div
        className="landing-footer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3>✨ Start learning and level up your skills today!</h3>
      </motion.div>
    </div>
  );
};

export default LandingPage;
