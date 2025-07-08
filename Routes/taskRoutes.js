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
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty().trim().escape(),
    check('description', 'Description is too long').optional().trim().escape().isLength({ max: 1000 }),
    check('dueDate', 'Please provide a valid due date').isISO8601().toDate(),
    check('priority', 'Priority must be low, medium, or high').optional().isIn(['low', 'medium', 'high'])
  ],
  createTask
);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
router.get('/', getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put(
  '/:id',
  [
    check('title', 'Title is required').optional().not().isEmpty().trim().escape(),
    check('description', 'Description is too long').optional().trim().escape().isLength({ max: 1000 }),
    check('dueDate', 'Invalid due date').optional().isISO8601(),
    check('priority', 'Invalid priority').optional().isIn(['low', 'medium', 'high']),
    check('completed', 'Completed must be a boolean').optional().isBoolean()
  ],
  updateTask
);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', deleteTask);

// @route   PUT /api/tasks/:id/toggle-complete
// @desc    Toggle task completion status
// @access  Private
router.put('/:id/toggle-complete', toggleTaskComplete);

module.exports = router;
