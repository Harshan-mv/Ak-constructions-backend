const express = require('express');
const router = express.Router();
const { loginAdmin, forgotPassword, verifyOtp, resetPassword } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
