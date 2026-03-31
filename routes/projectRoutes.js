const express = require('express');
const router = express.Router();
const { getProjects, addProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.route('/')
  .get(getProjects)
  .post(protect, upload.single('image'), addProject);

router.route('/:id')
  .delete(protect, deleteProject);

module.exports = router;
