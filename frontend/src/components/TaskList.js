import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import FilterTasks from './FilterTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFilterChange = (status) => {
    setFilteredStatus(status);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = filteredStatus
    ? tasks.filter((task) => task.status === filteredStatus)
    : tasks;

 return (
  <div className="TaskContainer">
    <FilterTasks onFilterChange={handleFilterChange} />
    <button onClick={() => setIsModalOpen(true)}>Add Task</button>
    <table className="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.map((task) => (
          <tr key={task._id}>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>
              <button className="Editbtn" onClick={() => handleEditTask(task)}>
                Edit
              </button>
              <button className="Deletebtn" onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isModalOpen && (
      <TaskForm
        closeModal={() => setIsModalOpen(false)}
        fetchTasks={fetchTasks}
        editingTask={editingTask}
      />
    )}
  </div>
);

};

export default TaskList;
