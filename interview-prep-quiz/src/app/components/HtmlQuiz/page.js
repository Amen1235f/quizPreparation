'use client'
import React, { useState } from "react";
import styles from "./HtmlQuiz.module.css"; // Import the CSS module
import Link from 'next/link';

const HtmlQuiz=()=>{
    
    const questions = [
        {
          id: 1,
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
          ],
          answer: "Hyper Text Markup Language",
          hint: "It's a markup language used for creating web pages.",
          level: "Beginner",
        },
        {
          id: 2,
          question: "Which HTML tag is used to define a paragraph?",
          options: ["<p>", "<h1>", "<div>"],
          answer: "<p>",
          hint: "The tag starts with 'p' and is commonly used for text.",
          level: "Beginner",
        },
        {
          id: 3,
          question: "How do you create a hyperlink in HTML?",
          options: [
            "<a href='url'>link text</a>",
            "<link url='link text'/>",
            "<url link='link text'></url>",
          ],
          answer: "<a href='url'>link text</a>",
          hint: "Hyperlinks are created using the 'anchor' tag.",
          level: "Beginner",
        },
        {
          id: 4,
          question: "Which HTML attribute is used to define inline styles?",
          options: ["class", "style", "font"],
          answer: "style",
          hint: "This attribute is often used to define CSS properties directly in the HTML tag.",
          level: "Beginner",
        },
        {
          id: 5,
          question: "What is the correct HTML element for inserting a line break?",
          options: ["<br>", "<lb>", "<break>"],
          answer: "<br>",
          hint: "It's a self-closing tag commonly used to break lines of text.",
          level: "Beginner",
        },
        {
          id: 6,
          question: "How can you make a numbered list in HTML?",
          options: ["<ul>", "<ol>", "<dl>"],
          answer: "<ol>",
          hint: "'ol' stands for 'ordered list.'",
          level: "Intermediate",
        },
        {
          id: 7,
          question: "Which HTML element is used to define important text?",
          options: ["<i>", "<important>", "<strong>"],
          answer: "<strong>",
          hint: "This element is used for bolding text to show importance.",
          level: "Intermediate",
        },
        {
          id: 8,
          question: "What is the purpose of the <thead> tag in HTML?",
          options: [
            "It defines the header of a table.",
            "It defines the footer of a table.",
            "It defines the body of a table.",
          ],
          answer: "It defines the header of a table.",
          hint: "It is commonly used with <table> elements.",
          level: "Intermediate",
        },
        {
          id: 9,
          question: "What is the default display value of an <a> element?",
          options: ["block", "inline", "flex"],
          answer: "inline",
          hint: "<a> tags appear inline by default, not taking up the whole width.",
          level: "Intermediate",
        },
        {
          id: 10,
          question: "How do you specify the character encoding for an HTML document?",
          options: [
            "<meta charset='UTF-8'>",
            "<meta character='UTF-8'>",
            "<meta encoding='UTF-8'>",
          ],
          answer: "<meta charset='UTF-8'>",
          hint: "It is defined in the <head> section of the HTML document.",
          level: "Intermediate",
        },
        {
          id: 11,
          question: "What is the purpose of the alt attribute in the <img> tag?",
          options: [
            "To provide a tooltip for an image.",
            "To specify alternative text for an image if it cannot be displayed.",
            "To change the image size.",
          ],
          answer: "To specify alternative text for an image if it cannot be displayed.",
          hint: "This is crucial for accessibility and SEO.",
          level: "Advanced",
        },
        {
          id: 12,
          question: "Which of the following is a semantic HTML element?",
          options: ["<div>", "<span>", "<article>"],
          answer: "<article>",
          hint: "This element has a meaningful role in the structure of a webpage.",
          level: "Advanced",
        },
        {
          id: 13,
          question: "How do you create a multi-line text input in an HTML form?",
          options: ["<textarea>", "<input type='text' multiline>", "<input type='textarea'>"],
          answer: "<textarea>",
          hint: "It is a form element that can handle multiple lines of input.",
          level: "Advanced",
        },
        {
          id: 14,
          question: "Which attribute is used to open a link in a new tab in HTML?",
          options: ["newtab='true'", "target='_blank'", "tab='new'"],
          answer: "target='_blank'",
          hint: "It is a common attribute of the <a> tag.",
          level: "Advanced",
        },
        {
          id: 15,
          question: "What is the purpose of the data-* attribute in HTML?",
          options: [
            "To store custom data for an HTML element.",
            "To style an element.",
            "To specify the document type.",
          ],
          answer: "To store custom data for an HTML element.",
          hint: "This attribute is often used with JavaScript to handle custom data.",
          level: "Advanced",
        },
      ];

      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [userAnswers, setUserAnswers] = useState({});
      const [showHint, setShowHint] = useState(false);
      const [score, setScore] = useState(0);
      const [quizResult, setQuizResult] = useState('');
      const [hintUsage, setHintUsage] = useState(0); // Track the number of hints used
    
      const handleUserAnswer = (selectedAnswer) => {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: selectedAnswer });
      };
    
      const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowHint(false);
        }
      };
    
  // Inside the HtmlQuiz component
const scoreQuiz = async () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            calculatedScore += 1;
        }
    });
    setScore(calculatedScore);

    const resultMessage =
        calculatedScore > 3 && hintUsage <= 8
            ? `Congratulations! You scored ${calculatedScore} out of ${questions.length}.`
            : hintUsage > 8
            ? "You failed because you used more than 8 hints."
            : `Better luck next time! You scored ${calculatedScore} out of ${questions.length}.`;
    
    setQuizResult(resultMessage);
    
    // Send performance data to the backend
    await sendPerformanceData(calculatedScore, hintUsage);
};

const sendPerformanceData = async (score, hintsUsed) => {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage (or session)
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
                language: 'HTML',
                score: score,
                hintsUsed: hintsUsed,
            }),
        });
    } catch (error) {
        console.error("Error submitting performance data:", error);
    }
};



      const handleSubmit = (event) => {
        event.preventDefault();
        if (currentQuestionIndex === questions.length - 1) {
          scoreQuiz(); // Only score when it's the last question
        } else {
          nextQuestion();
        }
      };
    
      const toggleHint = (event) => {
        event.preventDefault(); // Prevent form submission
        if (hintUsage < 8) { // Allow hint only if it's used less than 8 times
          setShowHint(!showHint);
          if (!showHint) {
            setHintUsage(hintUsage + 1);
          }
        }
      };
    
      return (
        <div className={styles.htmlQuiz}>
          <div className={styles.iconContainer}>
          <img src="/images/html.jpg" alt="HTML Icon" className={styles.htmlIcon} />
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className={styles.quizTitle}>Quiz Level: {questions[currentQuestionIndex].level}</h2>
            <p className={styles.questionText}>{questions[currentQuestionIndex].question}</p>
            <ul className={styles.optionsList}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} className={styles.optionItem}>
                  <label>
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={userAnswers[currentQuestionIndex] === option}
                      onChange={() => handleUserAnswer(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={toggleHint} className={styles.hintButton}>
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && <p className={styles.hintText}>Hint: {questions[currentQuestionIndex].hint}</p>}
            {currentQuestionIndex < questions.length - 1 && (
              <button type="button" onClick={nextQuestion} className={styles.nextButton}>
                Next Question
              </button>
            )}
            <p className={styles.currentAnswer}>Current Answer: {userAnswers[currentQuestionIndex] || "None"}</p>
            {currentQuestionIndex === questions.length - 1 && (
              <button type="submit" className={styles.submitButton}>
                Submit Quiz
              </button>
            )}
          </form>
          {quizResult && <div className={styles.result}>{quizResult}</div>}
          {quizResult && score >= 3 &&  (
            
<Link href="/components/HtmlDocument" className={styles.advancedLink}>
    <button type="button" className={styles.nextButton}>
      Proceed to HTML Document
    </button>
  </Link>
)}
        </div>
      );
    };
    
export default HtmlQuiz