'use client'
import React from 'react';
import styles from './HtmlDocument.module.css'

export default function HtmlDocument() {
  return (
    <div className={styles.htmlDocument}>
      <header className={styles.header}>
        <h1>Comprehensive HTML Course</h1>
      </header>
      <main className={styles.content}>
        <section className={styles.section}>
          <h2>1. Introduction to HTML</h2>
          <p>HTML (HyperText Markup Language) is the standard language for creating webpages and web applications. It structures web content and defines the layout and elements on a page.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Basic HTML Structure</h2>
          <pre><code>
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <h1>Main Heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>`}
          </code></pre>
        </section>

        <section className={styles.section}>
          <h2>3. HTML Elements and Tags</h2>
          <ul>
            <li><strong>Headings:</strong> <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code></li>
            <li><strong>Paragraphs:</strong> <code>&lt;p&gt;</code></li>
            <li><strong>Links:</strong> <code>&lt;a href="URL"&gt;Link Text&lt;/a&gt;</code></li>
            <li><strong>Images:</strong> <code>&lt;img src="URL" alt="Description"&gt;</code></li>
            <li><strong>Lists:</strong>
              <ul>
                <li><strong>Ordered List:</strong> <code>&lt;ol&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;li&gt;Item 2&lt;/li&gt;&lt;/ol&gt;</code></li>
                <li><strong>Unordered List:</strong> <code>&lt;ul&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;li&gt;Item 2&lt;/li&gt;&lt;/ul&gt;</code></li>
              </ul>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. HTML Attributes</h2>
          <pre><code>
{`<a href="https://example.com" target="_blank">Visit Example</a>
<img src="image.jpg" alt="A description of the image" width="300" height="200">`}
          </code></pre>
        </section>

        <section className={styles.section}>
          <h2>5. Forms and Input Elements</h2>
          <pre><code>
{`<form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <input type="submit" value="Submit">
</form>`}
          </code></pre>
        </section>

        <section className={styles.section}>
          <h2>6. HTML5 Features</h2>
          <ul>
            <li><strong>Semantic Elements:</strong> <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;aside&gt;</code></li>
            <li><strong>Multimedia:</strong>
              <ul>
                <li><strong>Audio:</strong> <code>&lt;audio controls&gt;&lt;source src="audio.mp3" type="audio/mpeg"&gt;&lt;/audio&gt;</code></li>
                <li><strong>Video:</strong> <code>&lt;video width="320" height="240" controls&gt;&lt;source src="video.mp4" type="video/mp4"&gt;&lt;/video&gt;</code></li>
              </ul>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. HTML Best Practices</h2>
          <ul>
            <li><strong>Proper Nesting:</strong> Ensure tags are properly nested and closed.</li>
            <li><strong>Accessibility:</strong> Use <code>alt</code> attributes for images, <code>aria-label</code> for accessibility.</li>
            <li><strong>Validation:</strong> Use tools like the W3C Markup Validation Service to check for errors.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. Advanced HTML Concepts</h2>
          <ul>
            <li><strong>HTML APIs:</strong> The <code>Canvas</code> API, <code>Geolocation</code> API.</li>
            <li><strong>HTML and CSS Integration:</strong> Using <code>&lt;style&gt;</code> and <code>&lt;link&gt;</code> tags to apply CSS styles.</li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
