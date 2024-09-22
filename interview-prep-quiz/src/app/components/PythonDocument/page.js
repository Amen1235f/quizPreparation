'use client'
import React from 'react';
import styles from './PythonDocument.module.css'; // Import your styles

export default function PythonDocument() {
  return (
    <div className={styles.pythonInterview}>
      <header className={styles.header}>
        <h1>Comprehensive Python Interview Guide</h1>
      </header>
      <main className={styles.content}>
        <section className={styles.section}>
          <h2>1. Introduction to Python</h2>
          <p>Python is a high-level, interpreted language known for its readability and versatility. It is widely used in web development, data analysis, artificial intelligence, and more.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Variables and Data Types</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`# Example of declaring variables and using different data types
name = 'John'  # String
age = 30       # Integer
is_student = True  # Boolean
person = {'name': 'John', 'age': 30}  # Dictionary
numbers = [1, 2, 3, 4]  # List
`}
            </code>
          </pre>
          <p>Variables store data values. Python supports various data types including strings, integers, floats, booleans, lists, and dictionaries.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Functions</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`# Example of a simple function
def greet(name):
    return f'Hello, {name}!'

print(greet('Alice'))  # Output: Hello, Alice!
`}
            </code>
          </pre>
          <p>Functions are blocks of code designed to perform specific tasks. They can accept parameters and return values.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Conditional Statements</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`# Example of using if-else statements
number = 10

if number > 5:
    print('Number is greater than 5')
else:
    print('Number is 5 or less')
`}
            </code>
          </pre>
          <p>Conditional statements allow the execution of different code blocks based on conditions.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Loops</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`# Example of a for loop
for i in range(5):
    print(i)

# Example of a while loop
count = 0
while count < 5:
    print(count)
    count += 1
`}
            </code>
          </pre>
          <p>Loops enable repetitive execution of code blocks. `for` loops are used for iterating over sequences, while `while` loops run as long as a condition is true.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Lists and Dictionaries</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`# Example of list and dictionary manipulation
person = {'name': 'John', 'age': 30}
print(person['name'])  # Output: John
person['age'] = 31  # Update property
print(person['age'])  # Output: 31

numbers = [1, 2, 3]
numbers.append(4)  # Add item to list
print(numbers)  # Output: [1, 2, 3, 4]
`}
            </code>
          </pre>
          <p>Lists and dictionaries are used to store collections of data. Lists are ordered collections, while dictionaries are key-value pairs.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Error Handling</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`# Example of try-except for error handling
try:
    result = risky_operation()  # Assume this function may throw an error
except Exception as e:
    print(f'An error occurred: {e}')
`}
            </code>
          </pre>
          <p>Error handling is used to manage and respond to runtime errors in code.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Python ES6 Features</h2>
          <pre className={styles.codeBlock}>
            <code className={styles.codeText}>
{`# Example of list comprehensions and f-strings
squares = [x**2 for x in range(5)]
print(squares)  # Output: [0, 1, 4, 9, 16]

name = 'John'
greeting = f'Hello, {name}!'
print(greeting)  # Output: Hello, John!
`}
            </code>
          </pre>
          <p>Python has various features such as list comprehensions and f-strings that simplify code writing and improve readability.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Conclusion</h2>
          <p>Python is a powerful language with a rich set of features that facilitate various types of programming tasks. Mastery of its core concepts is essential for effective coding and problem-solving.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Python Interview Guide</p>
      </footer>
    </div>
  );
}
