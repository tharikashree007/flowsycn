import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskAPI, projectAPI } from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjectAndTasks();
  }, [id]);

  const fetchProjectAndTasks = async () => {
    try {
      const [projectResponse, tasksResponse] = await Promise.all([
        projectAPI.getProjects(),
        taskAPI.getTasks(id)
      ]);
      const currentProject = projectResponse.data.find(p => p._id === id);
      setProject(currentProject);
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const getFilteredTasks = () => {
    if (filter === 'all') return tasks;
    return tasks.filter(task => task.priority === filter);
  };

  const tasksByStatus = {
    todo: getFilteredTasks().filter(task => task.status === 'todo'),
    'in-progress': getFilteredTasks().filter(task => task.status === 'in-progress'),
    completed: getFilteredTasks().filter(task => task.status === 'completed')
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    return { total, completed, inProgress, todo };
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!project) return <div className="loading">Project not found</div>;

  const stats = getTaskStats();

  return (
    <div className="project-details">
      <div className="project-details-header">
        <div className="header-top">
          <button onClick={() => navigate('/dashboard')} className="btn-secondary back-btn">
            ← Back to Dashboard
          </button>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add Task
          </button>
        </div>
        
        <div className="project-info">
          <h1>{project.name}</h1>
          <div className="project-badges">
            <span className="status-badge">{project.status}</span>
            <span className="priority-badge">{project.priority}</span>
          </div>
        </div>

        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.todo}</span>
            <span className="stat-label">To Do</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="filter-controls">
          <label>Filter by Priority:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {showForm && (
        <TaskForm
          projectId={id}
          onTaskCreated={handleTaskCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="kanban-board">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="kanban-column">
            <div className="column-header">
              <h3>{status.replace('-', ' ').toUpperCase()}</h3>
              <span className="task-count">{statusTasks.length}</span>
            </div>
            <div className="tasks-list">
              {statusTasks.length === 0 ? (
                <div className="empty-column">
                  <p>No tasks in this status</p>
                </div>
              ) : (
                statusTasks.map(task => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;