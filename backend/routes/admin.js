const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  createUser,
  getSystemStats,
  getAllProjects,
  getAllTasks
} = require('../controllers/adminController');

// Middleware to check admin role
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
  next();
};

// Admin routes
router.get('/stats', auth, adminAuth, getSystemStats);
router.get('/users', auth, adminAuth, getAllUsers);
router.post('/users', auth, adminAuth, createUser);
router.put('/users/:id/role', auth, adminAuth, updateUserRole);
router.delete('/users/:id', auth, adminAuth, deleteUser);
router.get('/projects', auth, adminAuth, getAllProjects);
router.get('/tasks', auth, adminAuth, getAllTasks);

module.exports = router;