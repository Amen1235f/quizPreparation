'use client'; // Ensure this is used for Next.js client-side code

import React, { useState, useEffect, useCallback } from 'react';
import './reactInterview.css'; // Assuming you have the same CSS for styling
import Link from 'next/link';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs';

const ReactInterview = () => {
  const questions = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces, particularly single-page applications, using components and a declarative approach.",
      hint: "It's a library, not a framework."
    },
    {
      question: "What is a component in React?",
      answer: "A component is a reusable piece of the UI in React. It is like a JavaScript function that returns JSX to describe what the UI should look like.",
      hint: "Think of it as a UI building block."
    },
    {
      question: "What is the Virtual DOM in React?",
      answer: "The Virtual DOM is a lightweight copy of the actual DOM. React uses it to optimize rendering by only updating the part of the DOM that has changed.",
      hint: "It's a virtual representation of the DOM."
    },
    {
      question: "What is JSX?",
      answer: "JSX is a syntax extension of JavaScript that allows writing HTML-like code inside JavaScript files. It makes it easier to create React components.",
      hint: "It's like HTML but written inside JavaScript."
    },
    {
      question: "What are React hooks?",
      answer: "Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, and useContext.",
      hint: "They let you manage state in functional components."
    },
    {
      question: "What is the difference between state and props?",
      answer: "State is a local data storage that is managed within the component, whereas props are data passed from a parent component to a child component.",
      hint: "One is internal, the other is passed down."
    },
    {
      question: "What is the useEffect hook in React?",
      answer: "useEffect is a hook that allows you to perform side effects in functional components, such as fetching data or updating the DOM, after the component renders.",
      hint: "It's used for side effects."
    },
    {
      question: "What is prop drilling?",
      answer: "Prop drilling is the process of passing props from a parent component down to deeply nested child components, even if intermediate components don't use them.",
      hint: "It's about passing props down multiple levels."
    },
    {
      question: "What is Redux?",
      answer: "Redux is a state management library for JavaScript applications, often used with React to manage global state in a predictable way.",
      hint: "It helps manage global state."
    },
    {
      question: "What is the difference between class components and functional components?",
      answer: "Class components are ES6 classes with lifecycle methods, while functional components are plain JavaScript functions that use hooks to manage state and lifecycle.",
      hint: "One uses classes, the other uses functions."
    },
    {
      question: "What are higher-order components (HOCs)?",
      answer: "A higher-order component is a function that takes a component and returns a new component, allowing you to reuse component logic.",
      hint: "It's a function that wraps another component."
    },
    {
      question: "What is the useState hook in React?",
      answer: "useState is a hook that allows you to add state to functional components. It returns a state value and a function to update it.",
      hint: "It manages state in functional components."
    },
    {
      question: "What is context in React?",
      answer: "Context provides a way to pass data through the component tree without having to pass props down manually at every level.",
      hint: "It avoids prop drilling."
    },
    {
      question: "What is the React lifecycle?",
      answer: "The React lifecycle refers to the series of methods that are called at different stages of a component's existence, such as mounting, updating, and unmounting.",
      hint: "It's the different stages of a component's life."
    },
    {
      question: "What is memoization in React?",
      answer: "Memoization is an optimization technique used in React to cache the result of expensive function calls, preventing unnecessary re-rendering of components.",
      hint: "It prevents unnecessary re-renders."
    },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const maxHints = 8;

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        const loadedModel = await use.load();
        setModel(loadedModel);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Failed to load the model", error);
      } finally {
        setLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleAnswerChange = useCallback((index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  }, [answers]);

  const analyzeAnswer = async (userAnswer, correctAnswer) => {
    if (model) {
      const embeddings = await model.embed([userAnswer, correctAnswer]);
      const embeddingsArray = await embeddings.array();
      return cosineSimilarity(embeddingsArray) > 0.7;
    }
    return false;
  };

  const cosineSimilarity = (embeddings) => {
    const [a, b] = embeddings;
    const dotProduct = a.reduce((sum, value, i) => sum + value * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
    const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
    return dotProduct / (normA * normB);
  };

  const scoreQuiz = async () => {
    let calculatedScore = 0;

    for (const [index, item] of questions.entries()) {
      const userAnswer = answers[index].trim();
      const correctAnswer = item.answer.trim();
      if (await analyzeAnswer(userAnswer, correctAnswer)) {
        calculatedScore += 1;
      }
    }

    setScore(calculatedScore);
    const resultMessage =
      calculatedScore > 3 && hintsUsed <= maxHints
        ? `Congratulations! You scored ${calculatedScore} out of ${questions.length}.`
        : hintsUsed > maxHints
        ? "You failed because you used more than 8 hints."
        : `Better luck next time! You scored ${calculatedScore} out of ${questions.length}.`;

    setShowResult(true);
    await sendPerformanceData(calculatedScore, hintsUsed);
  };

  const handleHint = (index) => {
    if (hintsUsed < maxHints) {
      alert(questions[index].hint);
      setHintsUsed(hintsUsed + 1);
    } else {
      alert('You have used all available hints.');
    }
  };

  const sendPerformanceData = async (score, hintsUsed) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    try {
      await fetch('http://localhost:5001/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          language: 'React',
          score: score,
          hintsUsed: hintsUsed,
        }),
      });
    } catch (error) {
      console.error("Error submitting performance data:", error);
    }
  };

  return (
    <div className="interview-container">
      <h1>React Interview Quiz</h1>
      {loading ? (
        <div className="loading">Loading model...</div>
      ) : (
        <>
          <div className="questions-list">
            {questions.map((item, index) => (
              <div key={index} className="question-card">
                <h2 className="question-title">Question {index + 1}: {item.question}</h2>
                <div className="answer-input">
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e)}
                    placeholder="Type your answer here..."
                  />
                </div>
                <button onClick={() => handleHint(index)}>Hint</button>
              </div>
            ))}
          </div>
          <button onClick={scoreQuiz} className="submit-button">Submit</button>
          {showResult && (
            <div className="result">
              <h2>Quiz Results</h2>
              <p>{`You scored ${score} out of ${questions.length}.`}</p>
              {hintsUsed > maxHints && <p>You have exceeded the hint limit.</p>}
            </div>
          )}
        </>
      )}
      <Link href="/"><button className="back-button">Back to Home</button></Link>
    </div>
  );
};

export default ReactInterview;