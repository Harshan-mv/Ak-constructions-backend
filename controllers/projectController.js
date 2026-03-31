const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ success: true, data: projects });
});

// @desc    Add a project
// @route   POST /api/projects
// @access  Protected
const addProject = asyncHandler(async (req, res) => {
  const { title, description, status, place, ownerName, timeline } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Image is required');
  }

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'arkitektur/projects',
  });

  // Remove local temp file
  fs.unlinkSync(req.file.path);

  const project = await Project.create({
    title,
    description,
    status: status || 'ongoing',
    place,
    ownerName,
    timeline,
    imageUrl: result.secure_url,
    publicId: result.public_id,
  });

  res.status(201).json({ success: true, data: project });
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Protected
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Delete image from Cloudinary
  if (project.publicId) {
    await cloudinary.uploader.destroy(project.publicId);
  }

  // Delete from MongoDB
  await Project.findByIdAndDelete(req.params.id);

  res.json({ success: true, data: {} });
});

module.exports = { getProjects, addProject, deleteProject };
