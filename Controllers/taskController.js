const Task = require('../Models/Task');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// @desc    Toggle task completion status
// @route   PUT /api/tasks/:id/complete
// @access  Private
exports.toggleTaskComplete = async (req, res) => {
  try {
    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Find the task
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Toggle the completed status
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date() : null;

    // Save the updated task
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.error('Error toggling task completion:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate, priority } = req.body;

    // Create new task
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || 'medium',
      owner: req.user.id,
    });

    // Populate owner details
    await task.populate('owner', 'username email');

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all tasks for the logged-in user with filtering, sorting, and search
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    // Build query
    const query = { owner: req.user.id };
    const { priority, completed, search, sortBy } = req.query;

    // Filter by completion status if provided
    if (completed) {
      query.completed = completed === 'true';
    }

    // Filter by priority if provided
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }

    // Search in title and description if search term is provided
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      query.$or = [{ title: { $regex: searchRegex } }, { description: { $regex: searchRegex } }];
    }

    // Build sort object
    let sort = {};
    let sortPriorityInMemory = false;
    let sortPriorityDirection = 1;

    if (sortBy) {
      const parts = sortBy.split(':');
      const field = parts[0];
      const direction = parts[1] === 'desc' ? -1 : 1;

      if (field === 'priority') {
        // Mark for in-memory sorting
        sortPriorityInMemory = true;
        sortPriorityDirection = direction;
      } else {
        // Regular field sorting
        sort[field] = direction;
      }
    } else {
      // Default sort
      sort = { dueDate: 1, createdAt: -1 };
    }

    // Execute query with filters and sorting
    let tasks = await Task.find(query).sort(sort);

    // Handle priority sorting in memory if needed
    if (sortPriorityInMemory) {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      tasks.sort((a, b) => {
        const aOrder = priorityOrder[a.priority] || 0;
        const bOrder = priorityOrder[b.priority] || 0;
        return sortPriorityDirection * (aOrder - bOrder);
      });
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    // Check if task exists and belongs to the user
    let task = await Task.findOne({ _id: id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized',
      });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;

    // Save the updated task
    const updatedTask = await task.save();
    await updatedTask.populate('owner', 'username email');

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to the user
    const task = await Task.findOne({ _id: id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized',
      });
    }

    // Delete the task (hard delete)
    await Task.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id },
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
