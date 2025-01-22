import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bell, RotateCcw, Calendar } from 'lucide-react';
import { addTask } from '../store/slices/tasksSlice';

const TaskInput = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      priority,
      completed: false,
      important: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || undefined,
    };

    dispatch(addTask(newTask));
    setTitle('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <div className="bg-green-50 rounded-lg p-4 mb-6">
      <h2 className="text-gray-600 mb-4">Add A Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex items-center space-x-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          {showDatePicker && (
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              type="button" 
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button type="button" className="text-gray-600 hover:text-gray-800">
              <Bell className="w-5 h-5" />
            </button>
            <button type="button" className="text-gray-600 hover:text-gray-800">
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            ADD TASK
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;