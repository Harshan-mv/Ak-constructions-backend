const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/Testimonial');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json({ success: true, data: testimonials });
});

// @desc    Add a testimonial
// @route   POST /api/testimonials
// @access  Protected
const addTestimonial = asyncHandler(async (req, res) => {
  const { name, text, role } = req.body;

  if (!name || !text) {
    res.status(400);
    throw new Error('Name and testimonial text are required');
  }

  let imageUrl = null;
  let publicId = null;

  // Image is optional for testimonials
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'arkitektur/testimonials',
    });
    fs.unlinkSync(req.file.path);
    imageUrl = result.secure_url;
    publicId = result.public_id;
  }

  const testimonial = await Testimonial.create({
    name,
    text,
    role: role || 'Client',
    imageUrl,
    publicId,
  });

  res.status(201).json({ success: true, data: testimonial });
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Protected
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  // Delete image from Cloudinary (if one exists)
  if (testimonial.publicId) {
    await cloudinary.uploader.destroy(testimonial.publicId);
  }

  // Delete from MongoDB
  await Testimonial.findByIdAndDelete(req.params.id);

  res.json({ success: true, data: {} });
});

module.exports = { getTestimonials, addTestimonial, deleteTestimonial };
