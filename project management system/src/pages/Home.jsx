import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to FlowSync</h1>
          <p>Streamline your project management with our powerful, intuitive platform</p>
          
          {user ? (
            <div className="user-actions">
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
              <Link to="/profile" className="btn-secondary">
                View Profile
              </Link>
            </div>
          ) : (
            <div className="auth-actions">
              <Link to="/login" className="btn-primary">
                Sign In
              </Link>
              <Link to="/register" className="btn-secondary">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose FlowSync?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Task Management</h3>
            <p>Organize and track tasks with our intuitive kanban board system</p>
          </div>
          <div className="feature-card">
            <h3>Team Collaboration</h3>
            <p>Work together seamlessly with real-time updates and notifications</p>
          </div>
          <div className="feature-card">
            <h3>Project Tracking</h3>
            <p>Monitor progress and deadlines with comprehensive project analytics</p>
          </div>
          <div className="feature-card">
            <h3>Simple Interface</h3>
            <p>Clean, minimalist design that focuses on productivity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;