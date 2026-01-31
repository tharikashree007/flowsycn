import React, { useState } from 'react';
import { projectAPI } from '../utils/api';

const MemberManager = ({ project, onProjectUpdated }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await projectAPI.addMember(project._id, email);
      onProjectUpdated(response.data);
      setEmail('');
      setShowAddForm(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      try {
        const response = await projectAPI.removeMember(project._id, userId);
        onProjectUpdated(response.data);
      } catch (error) {
        console.error('Error removing member:', error);
      }
    }
  };

  return (
    <div className="member-manager">
      <div className="members-header">
        <h4>Team Members ({project.members?.length || 0})</h4>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Member
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddMember} className="add-member-form">
          {error && <div className="error">{error}</div>}
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="members-list">
        {project.members?.map(member => (
          <div key={member._id} className="member-item">
            <div className="member-info">
              <span className="member-name">{member.name}</span>
              <span className="member-email">{member.email}</span>
            </div>
            {project.owner._id !== member._id && (
              <button
                onClick={() => handleRemoveMember(member._id)}
                className="btn-danger remove-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberManager;