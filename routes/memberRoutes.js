const express = require('express');
const router = express.Router();
const { getMembers, addMember, deleteMember } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.route('/')
  .get(getMembers)
  .post(protect, upload.single('image'), addMember);

router.route('/:id')
  .delete(protect, deleteMember);

module.exports = router;
