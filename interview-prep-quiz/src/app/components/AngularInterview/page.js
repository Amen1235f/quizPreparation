'use client'; // Ensure this is used for Next.js client-side code

import React, { useState, useEffect, useCallback } from 'react';
import './angularInterview.css'; // Assuming you have the same CSS for styling
import Link from 'next/link';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs';

const AngularInterview = () => {
  const questions = [
    {
      question: "What is Angular?",
      answer: "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.",
      hint: "It's a web framework developed by Google."
    },
    {
      question: "What are Angular components?",
      answer: "Components are the basic building blocks of Angular applications, controlling a patch of screen called a view.",
      hint: "Think of them as building blocks."
    },
    {
      question: "What is data binding in Angular?",
      answer: "Data binding is a mechanism that allows data to flow between a component's class and its template, keeping the view in sync with the underlying data model.",
      hint: "It keeps the view and model in sync."
    },
    {
      question: "What is an Angular module?",
      answer: "An Angular module is a container for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.",
      hint: "It's a container for code."
    },
    {
      question: "What is the Angular CLI?",
      answer: "The Angular CLI is a command-line interface tool that helps to automate the development workflow when building Angular applications.",
      hint: "It's a tool that helps automate workflows."
    },
    {
      question: "What is Dependency Injection in Angular?",
      answer: "Dependency Injection (DI) is a design pattern in Angular that allows a class to receive its dependencies from an external source rather than creating them itself.",
      hint: "It helps manage dependencies."
    },
    {
      question: "What are directives in Angular?",
      answer: "Directives are special markers in Angular that extend the behavior of elements in the application’s DOM.",
      hint: "They extend element behavior."
    },
    {
      question: "What is Angular routing?",
      answer: "Angular's routing module allows you to configure navigation paths in your application, connecting URLs to components.",
      hint: "It handles navigation."
    },
    {
      question: "What is RxJS in Angular?",
      answer: "RxJS is a library for reactive programming using observables, making it easier to compose asynchronous or callback-based code in Angular.",
      hint: "It helps with reactive programming."
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
          language: 'Angular',
          score: score,
          hintsUsed: hintsUsed,
        }),
      });
    } catch (error) {
      console.error("Error submitting performance data:", error);
    }
  };

  const handleSubmit = async () => {
    await scoreQuiz();
  };

  return (
    <div className="interview-container">
      <h1>Angular Interview Quiz</h1>
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
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
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

export default AngularInterview;