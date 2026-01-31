import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <span className="brand-text">FlowSync</span>
        </Link>
      </div>
      
      <div className="nav-links">
        <Link to="/">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>
            <Link to="/profile">
              Profile
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin">
                Admin Panel
              </Link>
            )}
            <div className="user-menu">
              <div className="user-info">
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">
                    {user.role === 'admin' ? 'Administrator' : 
                     user.role === 'manager' ? 'Project Manager' : 'Team Member'}
                  </span>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-secondary logout-btn">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              Sign In
            </Link>
            <Link to="/register">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;