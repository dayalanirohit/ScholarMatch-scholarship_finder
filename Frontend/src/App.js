import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import CompleteProfile from './pages/CompleteProfile';
import Login from './components/Login';
import AllScholarships from './pages/AllScholarships';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import MyScholarships from './pages/MyScholarships'; // ✅ New Import
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Layout component for conditional navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup', '/complete-profile'].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const AppRoutes = () => (
  <Layout>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/all"
        element={
          <PrivateRoute>
            <AllScholarships />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/mysch" // ✅ New Route
        element={
          <PrivateRoute>
            <MyScholarships />
          </PrivateRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
