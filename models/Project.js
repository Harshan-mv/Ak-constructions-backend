const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  publicId: {
    type: String,
    required: [true, 'Cloudinary public ID is required'],
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing'],
    default: 'ongoing',
  },
  place: {
    type: String,
    trim: true,
  },
  ownerName: {
    type: String,
    trim: true,
  },
  timeline: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
