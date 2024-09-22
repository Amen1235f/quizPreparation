'use client';
import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

    const fetchUserData = async () => {
      try {
        // Fetch user data
        const response = await fetch(`http://localhost:5001/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');

        const userData = await response.json();
        setUser(userData);
        
        // Fetch enrollments for this user
        const enrollmentsResponse = await fetch(`http://localhost:5001/api/${userId}/enrollments`);
        if (!enrollmentsResponse.ok) {
          setEnrollments([]);
        } else {
          const enrollmentsData = await enrollmentsResponse.json();
          setEnrollments(enrollmentsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{user?.username}'s Dashboard</h1>
        <p>Email: {user?.email}</p>
      </div>
      
      <h2>Your Enrollments:</h2>
      <div className="enrollment-list">
        {enrollments.length > 0 ? (
          enrollments.map((enrollment) => (
            <div key={enrollment.id} className="enrollment-item">
              <p><strong>Course:</strong> {enrollment.language}</p>
              <p><strong>Score:</strong> {enrollment.score}</p>
            </div>
          ))
        ) : (
          <p className="no-enrollments">No enrollments found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
