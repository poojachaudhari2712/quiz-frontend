import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Register.css';
import ThemeToggle from '../components/ThemeToggle';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log({ name, email, password }); 
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      if (data) navigate('/login');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError('Registration failed. Please try again.');
    }
  };
  

  return (
    <motion.div
      className="register-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="register-left">
        <h1>Join Us Today!</h1>
        <h2>Create Your Quiz Account</h2>
        <p>Register now and start your quiz journey. Learn, grow, and compete!</p>
      </div>

      <motion.div
        className="register-right"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>

      <ThemeToggle />
    </motion.div>
  );
};

export default Register;
