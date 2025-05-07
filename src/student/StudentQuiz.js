import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./StudentQuiz.css";
import FullscreenProctor from "./FullscreenProctor";

const StudentQuiz = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewData, setReviewData] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [timer, setTimer] = useState(30);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quiz/getquizzes");
        const filtered = res.data.filter(
          (quiz) => quiz.subject.toLowerCase() === subject.toLowerCase()
        );

        const allQuestions = [];
        filtered.forEach((quiz) => {
          quiz.sections.forEach((section) => {
            section.questions.forEach((q) => {
              allQuestions.push({
                ...q,
                sectionName: section.name,
                correctAnswer: q.correctAnswers?.[0] || "",
              });
            });
          });
        });

        setQuestions(allQuestions);
        setQuizId(filtered[0]._id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchQuestions();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleSubmitQuiz();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [subject]);

  useEffect(() => {
    if (timerRunning && !showResult) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(timerInterval);
            handleSubmitQuiz();
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [timerRunning, showResult]);

  const handleOptionSelect = (option) => {
    const updated = [...userAnswers];
    updated[currentQIndex] = option;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      window.scrollTo(0, 0);
    } else {
      calculateScoreAndReview();
      handleSubmitQuiz();
      setShowResult(true);
    }
  };

  const calculateScoreAndReview = () => {
    let tempScore = 0;
    const review = questions.map((q, i) => {
      const userAns = userAnswers[i] || "Not Answered";
      const correctAns = q.correctAnswer || "No Answer";

      if (userAns === correctAns) tempScore++;

      return {
        question: q.question,
        userAnswer: userAns,
        correctAnswer: correctAns,
      };
    });

    setScore(tempScore);
    setReviewData(review);
  };

  const handleSubmitQuiz = async () => {
    try {
      const resultSections = questions.reduce((sections, q, i) => {
        const sectionIndex = sections.findIndex(s => s.name === q.sectionName);
        const selected = userAnswers[i];
        const isCorrect = selected === q.correctAnswer;

        const answerObj = {
          question: q.question,
          selectedAnswers: selected,
          correctAnswers: q.correctAnswer,
          isCorrect,
        };

        if (sectionIndex === -1) {
          sections.push({
            name: q.sectionName,
            answers: [answerObj],
            score: isCorrect ? 1 : 0,
          });
        } else {
          sections[sectionIndex].answers.push(answerObj);
          if (isCorrect) sections[sectionIndex].score++;
        }

        return sections;
      }, []);

      await axios.post("http://localhost:5000/api/results/submit", {
        quizId,
        studentId: localStorage.getItem("userId"),
        answers: resultSections,
      });

      alert("Quiz submitted successfully!");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (questions.length === 0) return <p>No questions found for {subject}</p>;

  const currentQuestion = questions[currentQIndex];
  const selectedAnswer = userAnswers[currentQIndex];

  if (showResult) {
    return (
      <motion.div
        className="result-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="result-score">
          Your Score: {score} / {questions.length}
        </h2>
        <div className="review-section">
          {reviewData.map((item, i) => (
            <div key={i} className="review-question">
              <p><strong>Q{i + 1}:</strong> {item.question}</p>
              <p className="user-answer">Your Answer: {item.userAnswer}</p>
              <p className="correct-answer">Correct Answer: {item.correctAnswer}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/student/dashboard")}>Go to Dashboard</button>
      </motion.div>
    );
  }

  return (
    <>
    <motion.div
      className="student-quiz-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >
      
      <h2>Quiz: {subject}</h2>
      <div className="timer">
        <p>
          Time Left: {Math.floor(timer * (questions.length)/ 60)}:
          {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
        </p>
      </div>
      <div className="quiz-section">
        <h3>{currentQuestion.sectionName}</h3>
        <div className="question-box">
          <p><strong>Q{currentQIndex + 1}:</strong> {currentQuestion.question}</p>
          <ul>
            {currentQuestion.options.map((opt, i) => (
              <li
              key={i}
              onClick={() => handleOptionSelect(opt)}
              style={{
                backgroundColor: selectedAnswer === opt ? "#4a90e2" : "transparent",
                color: selectedAnswer === opt ? "#fff" : "#555",
              }}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
        <button className="next-button" onClick={handleNext}>
          {currentQIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </motion.div>
  </>
  );
};

export default StudentQuiz;
