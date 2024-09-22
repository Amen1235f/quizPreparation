'use client'
import React from "react";
import './Interface.css';
import Link from "next/link";

const Interface = () => {
  // Get the logged-in user's ID from local storage
  const loggedInUserId = localStorage.getItem('userId');

  return (
    <div className="interface-container">
      <div className="left-side">
        <h1>About Us</h1><br/>
        <p>You will be ready <span>for interview</span></p><br/>
        <p>Here you will discover the tests and questions of interviews. We will do everything to land your first job.</p>
        <Link href={{ pathname: "/components/Languages", query: { userId: loggedInUserId } }} passHref>
          <button>Enroll now</button>
        </Link>
      </div>

      <div className="cards-container">
        <div className="card1">Join Community</div>
        <div className="card2">Solve problems that will enhance your skills</div>
        <div className="card3"><span>Show in</span></div>
      </div>

      <div className="right-side">
        <img src='/images/19197061.png' alt="interview-img" />
      </div>
    </div>
  );
};

export default Interface;
