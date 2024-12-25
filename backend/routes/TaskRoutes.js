const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET /tasks: Fetch all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks',error});
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
});

// PATCH /tasks/:id: Update a task
router.patch('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message); // Log detailed error for debugging
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid task update data', details: error.errors });
    } else {
      res.status(500).json({ error: 'An error occurred while updating the task' });
    }
  }
});

// DELETE /tasks/:id: Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message); // Log detailed error for debugging
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
});

module.exports = router;
