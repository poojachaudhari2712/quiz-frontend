import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ip, setIp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error("Failed to get IP address:", err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        ip,
      });

      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("token", data.token);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials or you are not registered yet");
    }
  };

  return (
    <div className="login-theme-container">
      <motion.div
        className="login-theme-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>
          Welcome Back! <br />
          <span>Login to Your Quiz Portal</span>
        </h1>
        <p>Compete. Learn. Excel. Let the quiz journey begin!</p>
      </motion.div>

      <motion.div
        className="login-theme-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <form className="login-theme-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>

          <p className="register-text">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
        <ThemeToggle />
      </motion.div>
    </div>
  );
};

export default Login;
