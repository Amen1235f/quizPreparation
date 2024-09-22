import React from "react";
import Link from "next/link";
import './Languages.css';  // Import custom styles

const Languages = () => {
  // List of programming languages and frameworks
  const data = [
    { name: "JavaScript", logo: "/images/web-dev.jpg", route: "/components/JavaScriptInterview" },
    { name: "Python", logo: "/images/py.jpg", route: "/components/PythonInterview" },
    { name: "React", logo: "/images/react.png", route: "/components/ReactInterview" },
    { name: "Angular", logo: "/images/angular.png", route: "/components/AngularInterview" },
    { name: "Html", logo: "/images/html.jpg", route: "/components/HtmlQuiz" },
  ];

  
  return (
    <div className="languages-container">
      {data.map((item, index) => (
        <Link href={item.route} key={index}>
          <div className="card">
            <img src={item.logo} alt={`${item.name} logo`} className="card-logo" />
            <h2>{item.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Languages;
