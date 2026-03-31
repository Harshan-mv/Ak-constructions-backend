const express = require('express');
const router = express.Router();
const { getTestimonials, addTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.route('/')
  .get(getTestimonials)
  .post(protect, upload.single('image'), addTestimonial);

router.route('/:id')
  .delete(protect, deleteTestimonial);

module.exports = router;
