const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    default: 'Client',
  },
  imageUrl: {
    type: String,
  },
  publicId: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
