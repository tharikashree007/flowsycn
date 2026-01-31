import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../utils/api';
import MemberManager from './MemberManager';

const ProjectCard = ({ project, onProjectDeleted }) => {
  const [showMembers, setShowMembers] = useState(false);
  const [currentProject, setCurrentProject] = useState(project);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.deleteProject(project._id);
        onProjectDeleted(project._id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleProjectUpdated = (updatedProject) => {
    setCurrentProject(updatedProject);
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

  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{currentProject.name}</h3>
        <div 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(currentProject.status) }}
        >
          {currentProject.status}
        </div>
      </div>
      
      <p className="project-description">{currentProject.description}</p>
      
      <div className="project-meta">
        <div className="project-dates">
          <small>Start: {new Date(currentProject.startDate).toLocaleDateString()}</small>
          <small>End: {new Date(currentProject.endDate).toLocaleDateString()}</small>
        </div>
        <div className="project-priority">
          Priority: <span className={`priority-${currentProject.priority}`}>{currentProject.priority}</span>
        </div>
      </div>

      <div className="project-team">
        <small>Owner: {currentProject.owner?.name}</small>
        <small>Members: {currentProject.members?.length || 0}</small>
        <small>Tasks: {currentProject.tasks?.length || 0}</small>
      </div>

      <div className="project-actions">
        <Link to={`/projects/${currentProject._id}`} className="btn-secondary">
          View Tasks
        </Link>
        <button 
          onClick={() => setShowMembers(!showMembers)}
          className="btn-secondary"
        >
          {showMembers ? 'Hide Members' : 'Manage Members'}
        </button>
        <button onClick={handleDelete} className="btn-danger">
          Delete
        </button>
      </div>

      {showMembers && (
        <MemberManager 
          project={currentProject} 
          onProjectUpdated={handleProjectUpdated}
        />
      )}
    </div>
  );
};

export default ProjectCard;