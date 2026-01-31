import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';

const TaskOverview = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await adminAPI.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: '#9e9e9e',
      'in-progress': '#ff9800',
      completed: '#4caf50'
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

  const filteredTasks = tasks.filter(task => 
    filter === 'all' || task.status === filter
  );

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="task-overview">
      <div className="overview-header">
        <h2>Task Overview</h2>
        <div className="filter-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="tasks-table">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Created By</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task._id}>
                <td>
                  <div className="task-info">
                    <strong>{task.title}</strong>
                    <small>{task.description}</small>
                  </div>
                </td>
                <td>{task.project?.name || 'N/A'}</td>
                <td>{task.assignedTo?.name || 'Unassigned'}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status}
                  </span>
                </td>
                <td>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                </td>
                <td>
                  {task.dueDate 
                    ? new Date(task.dueDate).toLocaleDateString()
                    : 'No due date'
                  }
                </td>
                <td>{task.createdBy?.name || 'Unknown'}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTasks.length === 0 && (
        <div className="no-data">
          <p>No tasks found for the selected filter.</p>
        </div>
      )}

      <div className="task-summary">
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Total Tasks</h4>
            <span className="summary-number">{tasks.length}</span>
          </div>
          <div className="summary-card">
            <h4>To Do</h4>
            <span className="summary-number">
              {tasks.filter(t => t.status === 'todo').length}
            </span>
          </div>
          <div className="summary-card">
            <h4>In Progress</h4>
            <span className="summary-number">
              {tasks.filter(t => t.status === 'in-progress').length}
            </span>
          </div>
          <div className="summary-card">
            <h4>Completed</h4>
            <span className="summary-number">
              {tasks.filter(t => t.status === 'completed').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;