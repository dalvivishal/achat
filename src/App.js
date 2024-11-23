import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Sidebar from './components/SideBar';
import ChatPage from './components/ChatPage';

function App() {
  const [user, setUser] = useState(null);

  // Get user details from localStorage on page load
  useEffect(() => {
    const user_details = JSON.parse(localStorage.getItem('user'));
    if (user_details?.username) {
      setUser(user_details.username);
    }
  }, []);

  // Handle login
  const handleLogin = (username) => {
    setUser(username);
    // localStorage.setItem('user', JSON.stringify({ username })); // Save to localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear localStorage
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to login if the user is not logged in */}
          <Route
            path="/register"
            element={user ? <Navigate to="/chat" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/chat" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/chat"
            element={user ? <Sidebar onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />}
          />
          <Route path="/chat/:encryptedUserIds" element={user ? <ChatPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
