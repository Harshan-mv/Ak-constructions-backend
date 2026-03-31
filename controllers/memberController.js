const asyncHandler = require('express-async-handler');
const Member = require('../models/Member');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all members
// @route   GET /api/members
// @access  Public
const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json({ success: true, data: members });
});

// @desc    Add a member
// @route   POST /api/members
// @access  Protected
const addMember = asyncHandler(async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    res.status(400);
    throw new Error('Name and role are required');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Image is required');
  }

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'arkitektur/members',
  });

  // Remove local temp file
  fs.unlinkSync(req.file.path);

  const member = await Member.create({
    name,
    role,
    imageUrl: result.secure_url,
    publicId: result.public_id,
  });

  res.status(201).json({ success: true, data: member });
});

// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Protected
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error('Member not found');
  }

  // Delete image from Cloudinary
  if (member.publicId) {
    await cloudinary.uploader.destroy(member.publicId);
  }

  // Delete from MongoDB
  await Member.findByIdAndDelete(req.params.id);

  res.json({ success: true, data: {} });
});

module.exports = { getMembers, addMember, deleteMember };
