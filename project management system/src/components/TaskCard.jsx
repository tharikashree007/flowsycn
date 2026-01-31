import React, { useState } from 'react';
import { taskAPI } from '../utils/api';

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority
  });

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await taskAPI.updateTask(task._id, { status: newStatus });
      onTaskUpdated(response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await taskAPI.updateTask(task._id, editData);
      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#4caf50',
      medium: '#ffa500',
      high: '#f44336'
    };
    return colors[priority] || '#666';
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            required
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            required
          />
          <select
            value={editData.status}
            onChange={(e) => setEditData({...editData, status: e.target.value})}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={editData.priority}
            onChange={(e) => setEditData({...editData, priority: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="task-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h4>{task.title}</h4>
        <div 
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </div>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-meta">
        {task.assignedTo && (
          <small>Assigned to: {task.assignedTo.name}</small>
        )}
        {task.dueDate && (
          <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
        )}
      </div>

      <div className="task-status">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="btn-secondary">Edit</button>
        <button onClick={handleDelete} className="btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;