const express = require('express');
const { getProjects, createProject, updateProject, deleteProject, addMemberToProject, removeMemberFromProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .put(updateProject)
  .delete(deleteProject);

router.post('/:projectId/members', addMemberToProject);
router.delete('/:projectId/members/:userId', removeMemberFromProject);

module.exports = router;