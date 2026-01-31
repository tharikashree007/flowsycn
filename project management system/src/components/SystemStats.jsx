import React from 'react';

const SystemStats = ({ stats, onRefresh }) => {
  if (!stats) return <div>Loading statistics...</div>;

  const {
    totalUsers,
    totalProjects,
    totalTasks,
    usersByRole,
    projectsByStatus,
    tasksByStatus,
    recentUsers,
    recentProjects
  } = stats;

  const getStatusColor = (status) => {
    const colors = {
      planning: '#ffa500',
      active: '#4caf50',
      completed: '#2196f3',
      'on-hold': '#f44336',
      todo: '#9e9e9e',
      'in-progress': '#ff9800',
      admin: '#e91e63',
      manager: '#3f51b5',
      member: '#4caf50'
    };
    return colors[status] || '#666';
  };

  return (
    <div className="system-stats">
      <div className="stats-header">
        <h2>System Overview</h2>
        <button onClick={onRefresh} className="btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg> Refresh
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.5-4.68L17.5 16H20v6h4zm-12.5-11c.83 0 1.5-.67 1.5-1.5S8.33 8 7.5 8 6 8.67 6 9.5 6.67 11 7.5 11zm3 0c.83 0 1.5-.67 1.5-1.5S11.33 8 10.5 8 9 8.67 9 9.5 9.67 11 10.5 11zm3 0c.83 0 1.5-.67 1.5-1.5S14.33 8 13.5 8 12 8.67 12 9.5 12.67 11 13.5 11z"/>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{totalProjects}</h3>
            <p>Total Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <div className="stat-info">
            <h3>{totalTasks}</h3>
            <p>Total Tasks</p>
          </div>
        </div>
      </div>

      <div className="stats-charts">
        <div className="chart-section">
          <h3>Users by Role</h3>
          <div className="chart-bars">
            {usersByRole.map(item => (
              <div key={item._id} className="chart-bar">
                <div className="bar-label">{item._id}</div>
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${(item.count / totalUsers) * 100}%`,
                    backgroundColor: getStatusColor(item._id)
                  }}
                >
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>Projects by Status</h3>
          <div className="chart-bars">
            {projectsByStatus.map(item => (
              <div key={item._id} className="chart-bar">
                <div className="bar-label">{item._id}</div>
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${(item.count / totalProjects) * 100}%`,
                    backgroundColor: getStatusColor(item._id)
                  }}
                >
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>Tasks by Status</h3>
          <div className="chart-bars">
            {tasksByStatus.map(item => (
              <div key={item._id} className="chart-bar">
                <div className="bar-label">{item._id}</div>
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${(item.count / totalTasks) * 100}%`,
                    backgroundColor: getStatusColor(item._id)
                  }}
                >
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <div className="recent-section">
          <h3>Recent Users</h3>
          <div className="recent-list">
            {recentUsers.map(user => (
              <div key={user._id} className="recent-item">
                <div className="item-info">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </div>
                <div 
                  className="role-badge"
                  style={{ backgroundColor: getStatusColor(user.role) }}
                >
                  {user.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-section">
          <h3>Recent Projects</h3>
          <div className="recent-list">
            {recentProjects.map(project => (
              <div key={project._id} className="recent-item">
                <div className="item-info">
                  <strong>{project.name}</strong>
                  <small>by {project.owner?.name}</small>
                </div>
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStats;