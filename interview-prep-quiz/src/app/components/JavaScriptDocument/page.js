'use client'
import React from 'react';
import styles from './JavaScriptDocument.module.css'; // Import your styles

export default function JavaScriptDocument() {
  return (
    <div className={styles.javascriptDocument}>
      <header className={styles.header}>
        <h1>Comprehensive JavaScript Course</h1>
      </header>
      <main className={styles.content}>
        <section className={styles.section}>
          <h2>1. Introduction to JavaScript</h2>
          <p>JavaScript is a versatile programming language used for creating dynamic and interactive web applications. It is an essential part of web development, alongside HTML and CSS.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Variables and Data Types</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of declaring variables and using different data types
let name = 'John'; // String
const age = 30; // Number
let isStudent = true; // Boolean
let person = { name: 'John', age: 30 }; // Object
let numbers = [1, 2, 3, 4]; // Array
`}
            </code>
          </pre>
          <p>Result: Variables are used to store data values. Different types include strings, numbers, booleans, objects, and arrays.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Functions</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of a simple function
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('Alice')); // Output: Hello, Alice!
`}
            </code>
          </pre>
          <p>Result: Functions are blocks of code designed to perform a particular task. They can take parameters and return values.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Conditional Statements</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of using if-else statements
let number = 10;

if (number > 5) {
  console.log('Number is greater than 5');
} else {
  console.log('Number is 5 or less');
}
`}
            </code>
          </pre>
          <p>Result: Conditional statements are used to perform different actions based on different conditions.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Loops</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of a for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Example of a while loop
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
`}
            </code>
          </pre>
          <p>Result: Loops are used to execute the same block of code multiple times.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Objects and Arrays</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of object and array manipulation
let person = { name: 'John', age: 30 };
console.log(person.name); // Output: John
person.age = 31; // Update property
console.log(person.age); // Output: 31

let numbers = [1, 2, 3];
numbers.push(4); // Add item to array
console.log(numbers); // Output: [1, 2, 3, 4]
`}
            </code>
          </pre>
          <p>Result: Objects and arrays are used to store collections of data. Objects are key-value pairs, while arrays are ordered lists of values.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Promises and Async/Await</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of using Promises
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
};

fetchData().then(result => console.log(result)); // Output: Data fetched

// Example of using async/await
const fetchDataAsync = async () => {
  let result = await fetchData();
  console.log(result);
};

fetchDataAsync(); // Output: Data fetched
`}
            </code>
          </pre>
          <p>Result: Promises and async/await are used for handling asynchronous operations in JavaScript.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Error Handling</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of try-catch for error handling
try {
  let result = riskyOperation(); // Assume this function may throw an error
} catch (error) {
  console.error('An error occurred:', error);
}
`}
            </code>
          </pre>
          <p>Result: Error handling is used to manage and respond to runtime errors in code.</p>
        </section>

        <section className={styles.section}>
          <h2>9. JavaScript ES6 Features</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`// Example of template literals and arrow functions
const name = 'John';
const greeting = \`Hello, \${name}!\`;

const add = (a, b) => a + b;

console.log(greeting); // Output: Hello, John!
console.log(add(2, 3)); // Output: 5
`}
            </code>
          </pre>
          <p>Result: ES6 introduced new features like template literals and arrow functions to simplify code writing.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Conclusion</h2>
          <p>JavaScript is a powerful language with many features that enable developers to create dynamic and interactive web applications. Understanding its core concepts is essential for web development.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 JavaScript Course</p>
      </footer>
    </div>
  );
}
