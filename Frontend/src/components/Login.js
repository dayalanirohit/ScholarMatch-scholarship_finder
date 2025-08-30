import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ import this
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // ✅ actually call the login context method
        setMessage('Login successful! Redirecting...');
        setError('');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(data.message || 'Login failed.');
        setMessage('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to ScholarMatch</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
