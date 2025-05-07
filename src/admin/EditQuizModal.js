import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditQuizModal.css";

const EditQuizModal = ({ setIsOpen, selectedSubject }) => {
  const [quizData, setQuizData] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    sectionName: "",
    questions: [],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quiz/subject/${selectedSubject}`
        );
        const data = response.data[0];

        if (data) {
          const section = data.sections[0];
          const questions = section.questions.map((q) => ({
            _id: q._id,
            question: q.question || "",
            options: q.options || ["", "", "", ""],
            correctAnswer: q.correctAnswers[0] || "",
            duration: q.duration || "",
          }));

          setQuizData(data);
          setFormData({
            subject: data.subject || "",
            sectionName: section.name || "",
            questions,
          });
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [selectedSubject]);

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      duration: "",
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        subject: formData.subject,
        sections: [
          {
            name: formData.sectionName,
            questions: formData.questions.map((q) => ({
              _id: q._id,
              question: q.question,
              options: q.options,
              correctAnswers: [q.correctAnswer],
              duration: q.duration,
              type: "MCQ",
            })),
          },
        ],
      };

      await axios.put(
        `http://localhost:5000/api/quiz/${quizData._id}`,
        updatedData
      );
      alert("Quiz updated successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error("Error updating quiz:", err);
      alert("Failed to update quiz.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/quiz/${quizData._id}`);
      alert("Quiz deleted successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error("Error deleting quiz:", err);
      alert("Failed to delete quiz.");
    }
  };

  if (!quizData) return <div className="loading">Loading...</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ×
        </button>

        <h2>Edit Quiz</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </label>

          <label>
            Section Name:
            <input
              type="text"
              name="sectionName"
              value={formData.sectionName}
              onChange={(e) =>
                setFormData({ ...formData, sectionName: e.target.value })
              }
            />
          </label>

          <hr />
          {formData.questions.map((q, index) => (
            <div key={index} className="question-block">
              <h4>Question {index + 1}</h4>
              <label>
                Question:
                <input
                  type="text"
                  name="question"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
              </label>

              <label>Options:</label>
              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(index, optIndex, e.target.value)
                  }
                />
              ))}

              <label>
                Correct Answer:
                <input
                  type="text"
                  name="correctAnswer"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
              </label>

              <label>
                Duration (in seconds):
                <input
                  type="number"
                  name="duration"
                  value={q.duration}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
              </label>

              <hr />
            </div>
          ))}

          <button type="button" className="add-btn" onClick={handleAddQuestion}>
            + Add New Question
          </button>

          <div className="action-buttons">
            <button type="submit" className="submit-btn">
              Update Quiz
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuizModal;
