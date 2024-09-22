'use client'
import React, { useState, useEffect, useCallback } from 'react';
import './JavaScriptInterview.css'; // Import your styles
import Link from 'next/link';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs'; // Ensure TensorFlow.js is imported

const JavaScriptInterview = () => {
    
  // List of questions and answers
  const questions = [
    {
      question: "What is the difference between `==` and `===` in JavaScript?",
      answer: "`==` checks for equality with type coercion, while `===` checks for equality without type coercion.",
      hint: "Think about how JavaScript handles type conversion automatically in one case."
    },
    {
      question: "What is a closure in JavaScript?",
      answer: "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.",
      hint: "It's related to a function remembering its environment even after it has finished running."
    },
    {
      question: "Explain the concept of 'hoisting' in JavaScript.",
      answer: "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope.",
      hint: "It applies to variables and function declarations, but pay attention to how it treats `var`, `let`, and `const` differently."
    },
    {
      question: "What is the purpose of `bind()`, `call()`, and `apply()` methods in JavaScript?",
      answer: "`bind()` creates a new function that, when called, has its `this` keyword set to the provided value. `call()` and `apply()` invoke the function immediately, with `call()` accepting arguments as a list and `apply()` accepting arguments as an array.",
      hint: "These methods are all about controlling the `this` context of a function."
    },
    {
      question: "What is event delegation?",
      answer: "Event delegation is a technique where you use a single event listener on a parent element to handle events for its child elements, utilizing event bubbling.",
      hint: "This technique can reduce the number of event listeners in your code."
    },
    {
      question: "Explain the concept of prototypal inheritance.",
      answer: "Prototypal inheritance is a way to add methods and properties to objects in JavaScript, where objects can inherit directly from other objects.",
      hint: "It allows one object to inherit properties from another. JavaScript objects are linked this way."
    },
    {
      question: "What is the `this` keyword in JavaScript?",
      answer: "The `this` keyword refers to the object that is currently executing the code. Its value is determined by how a function is called.",
      hint: "Be mindful of where `this` is used and how functions are invoked."
    },
    {
      question: "What are Promises in JavaScript?",
      answer: "Promises are objects representing the eventual completion or failure of an asynchronous operation and its resulting value.",
      hint: "Used to manage asynchronous operations, promises help avoid 'callback hell.'"
    },
    {
      question: "How does JavaScript handle asynchronous code?",
      answer: "JavaScript handles asynchronous code using callbacks, Promises, and async/await syntax. These tools allow code to run in a non-blocking manner.",
      hint: "Think of how JavaScript avoids stopping the main thread while waiting for tasks to complete."
    },
    {
      question: "What is the difference between `null` and `undefined`?",
      answer: "`null` is an assignment value that represents the intentional absence of any object value, while `undefined` indicates that a variable has been declared but has not been assigned a value.",
      hint: "`undefined` is the default value, but `null` is manually assigned."
    },
    {
      question: "What is the 'Event Loop' in JavaScript?",
      answer: "The Event Loop is a mechanism that allows JavaScript to perform non-blocking operations by placing functions in a queue and executing them asynchronously.",
      hint: "The Event Loop coordinates the execution of code and handling of callbacks."
    },
    {
      question: "What are 'template literals' in JavaScript?",
      answer: "Template literals are string literals allowing embedded expressions, multi-line strings, and string interpolation, using backticks (`) instead of quotes.",
      hint: "Look for the use of `${}` inside backticks to embed expressions in strings."
    },
    {
      question: "Explain the difference between `let`, `const`, and `var`.",
      answer: "`let` and `const` are block-scoped variables introduced in ES6, while `var` is function-scoped. `const` creates a constant variable, while `let` can be reassigned.",
      hint: "`const` cannot be reassigned, while `let` can be, and both have scope differences from `var`."
    },
    {
      question: "What are JavaScript modules?",
      answer: "JavaScript modules are a way to break up code into separate files or modules that can be imported and exported, allowing for better code organization and reuse.",
      hint: "Modules make it easier to manage dependencies and organize code by splitting it up."
    },
    {
      question: "How does JavaScript handle memory management?",
      answer: "JavaScript uses garbage collection to manage memory automatically, freeing up memory that is no longer in use.",
      hint: "The engine determines when an object is no longer needed and frees the memory."
    },
    {
      question: "What are 'arrow functions' and how do they differ from regular functions?",
      answer: "Arrow functions are a shorter syntax for writing functions and do not have their own `this` context, making them useful for maintaining the context of `this` from surrounding code.",
      hint: "Unlike regular functions, arrow functions inherit `this` from their surrounding scope."
    },
    {
      question: "What is the difference between synchronous and asynchronous code?",
      answer: "Synchronous code runs sequentially, blocking further execution until complete, while asynchronous code allows other operations to continue while waiting for a task to complete.",
      hint: "Think about blocking and non-blocking operations when comparing these two concepts."
    },
    {
      question: "Explain the concept of 'destructuring' in JavaScript.",
      answer: "Destructuring is a shorthand syntax for extracting values from arrays or objects into distinct variables.",
      hint: "It helps you unpack values from arrays or objects in a concise way."
    },
    {
      question: "What is 'functional programming' in JavaScript?",
      answer: "Functional programming is a programming paradigm where functions are first-class citizens, and immutability and pure functions are emphasized.",
      hint: "It's all about pure functions and avoiding shared state or side effects."
    },
    {
      question: "How do `setTimeout()` and `setInterval()` work?",
      answer: "`setTimeout()` schedules a function to run after a specified delay, while `setInterval()` repeatedly executes a function at specified intervals.",
      hint: "Both functions are commonly used to handle delayed or repeated tasks."
    },
    // Add more questions as needed
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
          userId, // Include user ID dynamically
          language: 'JavaScript', // Change this as needed
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
      <h1>JavaScript Interview Quiz</h1>
      {loading ? (
        <div className="loading">Loading model...</div>
      ) : (
        <>
          <div className="questions-list">
            {questions.map((item, index) => (
              <div key={index} className="question-card">
                <h2 className="question-title">Question {index + 1}: {item.question}</h2>
                <div className="answer-section">
                  <textarea
                    className="answer-input"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e)}
                    placeholder="Your answer..."
                  />
                  <button
                    className="hint-button"
                    onClick={() => handleHint(index)}
                  >
                    Hint
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={scoreQuiz}>Submit</button>
          {showResult && (
            <div className="result">
              <h2>Your Score: {score} / {questions.length}</h2>
              <Link href="/">Back to Home</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JavaScriptInterview;