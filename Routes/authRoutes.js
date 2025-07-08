const express = require('express');
const { body } = require('express-validator');
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

// Input validation rules
const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .exists()
    .withMessage('Password is required')
];

const validateForgotPassword = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
];

const validateResetPassword = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
];

// Routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', authMiddleware.protect, authController.getMe);
router.post('/logout', authMiddleware.protect, authController.logout);

// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', validateForgotPassword, authController.forgotPassword);

// @route   PATCH /api/auth/reset-password/:token
// @access  Public
router.patch('/reset-password/:token', validateResetPassword, authController.resetPassword);

// @route   GET /api/auth/check-token/:token
// @access  Public
router.get('/check-token/:token', authController.checkTokenValidity);

module.exports = router;
