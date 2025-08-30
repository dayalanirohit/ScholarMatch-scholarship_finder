import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // fix import without braces
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // When token changes, decode and fetch full profile
  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      return;
    }

    localStorage.setItem('token', token);

    let decoded;
    try {
      decoded = jwtDecode(token);
      // We can set partial user info immediately (optional)
      setUser({ id: decoded.id, name: decoded.name });
    } catch (err) {
      console.error('Invalid token', err);
      setUser(null);
      setLoading(false);
      return;
    }

    // Fetch full user profile from backend
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/complete-profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data); // This replaces partial info with full profile
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = (tkn) => {
    setLoading(true);
    setToken(tkn);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('dismissedScholarshipId');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
