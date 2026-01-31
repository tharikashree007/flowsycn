import React from 'react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">ProjectPro</h1>
          <span className="header-tagline">Professional Project Management</span>
        </div>
        <div className="header-right">
          <span className="header-version">v2.0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;