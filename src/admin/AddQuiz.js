import React, { useState } from "react";
import axios from "axios";
import './AddQuiz.css';

const AddQuiz = () => {
  const [subject, setSubject] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      type: "MCQ",
      options: ["", "", "", ""],
      correctAnswers: [""],
      duration: 30
    }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswers = [value];
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        type: "MCQ",
        options: ["", "", "", ""],
        correctAnswers: [""],
        duration: 30
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      subject,
      sections: [
        {
          name: sectionName,
          questions
        }
      ]
    };

    try {
      const res = await axios.post("http://localhost:5000/api/quiz", payload);
      console.log("Quiz created:", res.data);
      alert("Quiz added successfully!");
    } catch (error) {
      console.error("Error creating quiz:", error.response?.data || error.message);
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="add-quiz-container">
      <h2>Add Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          required
        />
        <br />

        {questions.map((q, index) => (
          <div key={index} className="question-container">
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
              required
            />
            <br />
            <select
              value={q.type}
              onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
            >
              <option value="MCQ">MCQ</option>
              <option value="TrueFalse">TrueFalse</option>
            </select>
            <br />

            {q.options.map((opt, optIndex) => (
              <input
                key={optIndex}
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                required
              />
            ))}
            <br />
            <input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswers[0]}
              onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
              required
            />
            <br />
            <input
              type="number"
              placeholder="Duration"
              value={q.duration}
              onChange={(e) => handleQuestionChange(index, "duration", parseInt(e.target.value))}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addQuestion}>Add Question</button>
        <br />
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default AddQuiz;
