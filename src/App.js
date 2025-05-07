import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import AdminDashboard from './admin/AdminDashboard';
import AddQuiz from './admin/AddQuiz';
import EditQuiz from './admin/EditQuiz';
import EditQuizModal from './admin/EditQuizModal';
import AdminStudents from './admin/AdminStudent';
import StudentDashboard from './student/StudentDashboard';
import StudentQuiz from './student/StudentQuiz';
import PrivateRoutes from './routes/PrivateRoutes';
import AdminLeaderboard from './admin/AdminLeaderboard';
import CodeEditor from './student/CodeEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-quiz" element={<AddQuiz />} />
          <Route path="/admin/edit-quiz" element={<EditQuiz />} />
          <Route path="/admin/edit-quiz/:subject" element={<EditQuizModal />} />
          <Route path="/admin/registered-students" element={<AdminStudents />} />
          <Route path="/admin/leaderboard" element={<AdminLeaderboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/quiz/:subject" element={<StudentQuiz />} />
          <Route path='/student/dashboard/editor' element={<CodeEditor/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
