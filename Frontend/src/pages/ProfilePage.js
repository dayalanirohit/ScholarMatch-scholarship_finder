import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // ✅ import Link
import './ProfilePage.css'; 

const ProfilePage = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:5000/api/auth/complete-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => setUserData(res.data))
    .catch(err => console.error('Profile fetch error:', err));
  }, [token]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>My Profile</h2>
      <ul>
        <li><strong>Name:</strong> {userData.name}</li>
        <li><strong>Email:</strong> {userData.email}</li>
        <li><strong>GPA:</strong> {userData.gpa}</li>
        <li><strong>Expected Amount:</strong> ${userData.amount}</li>
        <li><strong>Location:</strong> {userData.location}</li>
        <li><strong>Course of Study:</strong> {userData.course}</li>
      </ul>

      {/* ✅ Link to My Scholarships page */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/mysch" className="btn btn-primary">
          View My Scholarships
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
