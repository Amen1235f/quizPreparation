'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";  // New CSS module for the Navbar

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking local storage
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId); // Convert to boolean
  }, []);

  const handleLogout = () => {
    // Remove user ID from local storage and update state
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <Link href="/">MyLogo</Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/components/HtmlQuiz">Quizzes</Link>
        <Link href="/about">About Us</Link>

        {!isLoggedIn ? (
          <>
            <Link href="/components/Register">Register</Link>
            <Link href="/components/Login">Login</Link>
          </>
        ) : (
          <>
            <Link href="/components/Dashboard">Dashboard</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
