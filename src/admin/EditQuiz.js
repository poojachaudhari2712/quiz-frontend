import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditQuiz.css";
import EditQuizModal from "./EditQuizModal";

function EditQuiz() {
  const [subjects, setSubjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz/subjects");
        const quizzes = response.data;
        setSubjects(quizzes);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleClick = (subject) => {
    setIsOpen(true);
    setSelectedSubject(subject);
  };

  return (
    <div className="edit-quiz-container">
      <div className="edit-quiz-card">
        <h2>Select a Subject to Edit</h2>
        <ul className="subject-list">
          {subjects.map((subject, index) => (
            <li key={index}>
              <button className="subject-btn" onClick={() => handleClick(subject)}>
                {subject}
              </button>
            </li>
          ))}
        </ul>
        {isOpen && (
          <EditQuizModal
            setIsOpen={setIsOpen}
            selectedSubject={selectedSubject}
          />
        )}
      </div>
    </div>
  );
}

export default EditQuiz;
