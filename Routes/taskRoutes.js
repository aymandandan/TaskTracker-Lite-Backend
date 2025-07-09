const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../Middlewares/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskComplete
} = require('../Controllers/taskController');

// Apply protect middleware to all routes
router.use(protect);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
// Custom middleware to validate task creation
const validateTaskCreation = [
  check('title', 'Title is required').not().isEmpty().trim().escape(),
  check('description', 'Description is too long').optional().trim().escape().isLength({ max: 1000 }),
  check('dueDate', 'Please provide a valid due date').isISO8601().toDate(),
  (req, res, next) => {
    // Only validate priority if it exists in the request body
    if (req.body.priority) {
      const priority = req.body.priority.toString().toLowerCase();
      if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({
          errors: [{
            msg: 'Priority must be low, medium, or high',
            param: 'priority',
            location: 'body'
          }]
        });
      }
      // Sanitize the priority
      req.body.priority = priority;
    } else {
      // Set default priority if not provided
      req.body.priority = 'medium';
    }
    next();
  }
];

router.post('/', validateTaskCreation, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
router.get('/', getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
// Custom middleware to validate task update
const validateTaskUpdate = [
  check('title', 'Title is required').optional().not().isEmpty().trim().escape(),
  check('description', 'Description is too long').optional().trim().escape().isLength({ max: 1000 }),
  check('dueDate', 'Invalid due date').optional().isISO8601(),
  check('completed', 'Completed must be a boolean').optional().isBoolean(),
  (req, res, next) => {
    // Only validate priority if it exists in the request body
    if (req.body.priority) {
      const priority = req.body.priority.toString().toLowerCase();
      if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({
          errors: [{
            msg: 'Priority must be low, medium, or high',
            param: 'priority',
            location: 'body'
          }]
        });
      }
      // Sanitize the priority
      req.body.priority = priority;
    }
    next();
  }
];

router.put('/:id', validateTaskUpdate, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', deleteTask);

// @route   PUT /api/tasks/:id/toggle-complete
// @desc    Toggle task completion status
// @access  Private
router.put('/:id/toggle-complete', toggleTaskComplete);

module.exports = router;
