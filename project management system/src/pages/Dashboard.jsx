import React, { useState, useEffect } from 'react';
import { projectAPI } from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
    setShowForm(false);
  };

  const handleProjectDeleted = (projectId) => {
    setProjects(projects.filter(p => p._id !== projectId));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Project Dashboard</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          onProjectCreated={handleProjectCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="projects-grid">
        {projects.length === 0 ? (
          <p>No projects found. Create your first project!</p>
        ) : (
          projects.map(project => (
            <ProjectCard
              key={project._id}
              project={project}
              onProjectDeleted={handleProjectDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;