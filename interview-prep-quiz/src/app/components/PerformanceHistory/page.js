// components/PerformanceHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PerformanceHistory = () => {
  const [enrollments, setEnrollments] = useState([]);
  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    const fetchPerformanceHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/users/${userId}/performance`);
            // Handle the response
        } catch (error) {
            console.error('Error fetching performance history:', error);
        }
    };
    
    

    if (userId) fetchPerformanceHistory();
  }, [userId]);

  return (
    <div>
      <h2>Your Performance History</h2>
      <ul>
        {enrollments.map((enrollment, index) => (
          <li key={index}>
            Course: {enrollment.name}, Score: {enrollment.score}, Status: {enrollment.status}, Performance: {enrollment.performance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceHistory;
