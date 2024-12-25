import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ closeModal, fetchTasks, editingTask }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Low',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        name: editingTask.name,
        description: editingTask.description,
        dueDate: editingTask.dueDate.split('T')[0], // Format for input type="date"
        status: editingTask.status,
        priority: editingTask.priority,
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        // Update existing task
        await axios.patch(`http://localhost:5000/api/tasks/${editingTask._id}`, formData);
      } else {
        // Add new task
        await axios.post('http://localhost:5000/api/tasks/', formData);
      }
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
