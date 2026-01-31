import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';

const ProjectOverview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await adminAPI.getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      planning: '#ffa500',
      active: '#4caf50',
      completed: '#2196f3',
      'on-hold': '#f44336'
    };
    return colors[status] || '#666';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#4caf50',
      medium: '#ffa500',
      high: '#f44336'
    };
    return colors[priority] || '#666';
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  );

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="project-overview">
      <div className="overview-header">
        <h2>Project Overview</h2>
        <div className="filter-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Projects</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project._id} className="project-overview-card">
            <div className="card-header">
              <h3>{project.name}</h3>
              <div className="badges">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status}
                </span>
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(project.priority) }}
                >
                  {project.priority}
                </span>
              </div>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-details">
              <div className="detail-row">
                <strong>Owner:</strong> {project.owner?.name}
              </div>
              <div className="detail-row">
                <strong>Members:</strong> {project.members?.length || 0}
              </div>
              <div className="detail-row">
                <strong>Tasks:</strong> {project.tasks?.length || 0}
              </div>
              <div className="detail-row">
                <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
              </div>
              <div className="detail-row">
                <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}
              </div>
              <div className="detail-row">
                <strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>

            {project.members && project.members.length > 0 && (
              <div className="members-list">
                <strong>Team Members:</strong>
                <div className="member-tags">
                  {project.members.map(member => (
                    <span key={member._id} className="member-tag">
                      {member.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-data">
          <p>No projects found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;