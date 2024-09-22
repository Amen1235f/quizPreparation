'use client'; // Ensure this is used for Next.js client-side code

import React, { useState, useEffect, useCallback } from 'react';
import './pythonInterview.css'; // Reuse the same CSS styles
import Link from 'next/link';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs';
const PythonInterview = () => {
  const questions = [
    {
      question: "What is __init__?",
      answer: "__init__ is a special method in Python classes. It is called when an object is created and is used to initialize the attributes of the class.",
      hint: "It's like a constructor in other OOP languages."
    },
    {
      question: "What is the difference between Python Arrays and Lists?",
      answer: "Arrays can only store items of the same data type, while lists can store items of any data type. Arrays require the array module, while lists are built-in.",
      hint: "Think of arrays as more rigid and lists as more flexible."
    },
    {
      question: "Explain how you can make a Python script executable on Unix.",
      answer: "Add #!/usr/bin/env python at the top of the script and give it execute permission using chmod +x script.py.",
      hint: "It involves changing file permissions and using a special line at the top."
    },
    {
      question: "What is slicing in Python?",
      answer: "Slicing is used to access a range of elements from a sequence like lists, tuples, or strings using the syntax sequence[start:stop:step].",
      hint: "It helps in retrieving parts of sequences like lists or strings."
    },
    {
      question: "What is a docstring in Python?",
      answer: "A docstring is a string literal that appears right after the definition of a function, method, class, or module to describe its purpose.",
      hint: "It's a comment, but with triple quotes."
    },
    {
      question: "What are unit tests in Python?",
      answer: "Unit tests are used to validate that individual units of source code (e.g., functions or methods) work as expected. The unittest module provides a framework for writing and running unit tests.",
      hint: "They ensure that code works as intended at the smallest scale."
    },
    {
      question: "What is a lambda function in Python?",
      answer: "A lambda function is a small anonymous function defined using the lambda keyword. It can have any number of arguments but only one expression.",
      hint: "It's a quick function without a name."
    },
    {
      question: "What is the difference between deep copy and shallow copy?",
      answer: "A shallow copy copies only the reference pointers, while a deep copy copies the entire object and all objects it references, creating a completely independent copy.",
      hint: "One is surface-level copying, the other is copying everything."
    },
    {
      question: "What is the Global Interpreter Lock (GIL) in Python?",
      answer: "The GIL is a mutex that protects access to Python objects, ensuring that only one thread executes Python bytecode at a time, even in multi-threaded applications.",
      hint: "It's something that controls thread execution in Python."
    },
    {
      question: "How do you manage memory in Python?",
      answer: "Python uses automatic memory management via a built-in garbage collector that reclaims unused memory. Developers can also manage memory explicitly using del statements.",
      hint: "Think of garbage collection."
    },
    {
      question: "What are decorators in Python?",
      answer: "Decorators are functions that modify the behavior of another function or method. They allow you to add functionality to an existing function dynamically.",
      hint: "It's a wrapper function."
    },
    {
      question: "What is the difference between a generator and an iterator in Python?",
      answer: "An iterator is an object that implements the __iter__() and __next__() methods. A generator is a simpler way to create iterators using the yield keyword.",
      hint: "One uses yield; the other uses next."
    },
    {
      question: "Explain the difference between *args and **kwargs.",
      answer: "*args is used to pass a variable number of positional arguments, while **kwargs is used to pass a variable number of keyword arguments to a function.",
      hint: "Think positional vs keyword arguments."
    },
    {
      question: "What is the difference between a list and a tuple in Python?",
      answer: "A list is mutable (can be changed), whereas a tuple is immutable (cannot be changed). Lists have dynamic sizes, while tuples are fixed-size.",
      hint: "One can be changed, the other cannot."
    },
    {
      question: "What are Python's built-in data structures?",
      answer: "Python has several built-in data structures, including lists, tuples, sets, and dictionaries. Each has specific characteristics and use cases.",
      hint: "They're the building blocks for organizing data."
    },
    {
      question: "What is the map() function in Python?",
      answer: "The map() function applies a given function to each item of an iterable (like a list) and returns a map object (an iterator).",
      hint: "It's used to apply a function across items."
    },
    {
      question: "What is the difference between range() and xrange()?",
      answer: "In Python 2, xrange() returns an iterator and is more memory efficient than range(), which returns a list. In Python 3, range() behaves like xrange().",
      hint: "It has to do with memory efficiency in older Python versions."
    },
    {
      question: "What is the use of the pass statement in Python?",
      answer: "The pass statement is a null operation used when a statement is syntactically required but no action is needed. It serves as a placeholder for future code.",
      hint: "It's a placeholder when you don't want to do anything."
    },
    {
      question: "Explain list comprehensions in Python.",
      answer: "List comprehensions provide a concise way to create lists. The syntax is [expression for item in iterable] and can include conditions.",
      hint: "It's a shorthand for creating lists."
    },
    {
      question: "What is the difference between Python 2 and Python 3?",
      answer: "Python 3 introduced many improvements and changes, such as print() being a function, integer division behavior, and Unicode by default, which are incompatible with Python 2.",
      hint: "Python 3 brought significant improvements."
    }
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
          language: 'Python', // Change this as needed
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
      <h1>Python Interview Quiz</h1>
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

export default PythonInterview;