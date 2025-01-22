import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState('all');
  
  const filterTasks = (tasks) => {
    const today = new Date().toISOString().split('T')[0];
    
    return tasks.filter(task => {
      if (filter === 'today') {
        return task.dueDate === today;
      }
      if (filter === 'important') {
        return task.important;
      }
      return true;
    });
  };

  const filteredTasks = filterTasks(tasks);
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('today')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'today' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setFilter('important')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'important' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Important
        </button>
      </div>

      <div className="space-y-2">
        {pendingTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      
      {completedTasks.length > 0 && (
        <>
          <h3 className="text-gray-600 font-medium mt-8 mb-4">Completed</h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </>
      )}

      {pendingTasks.length === 0 && completedTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Add some tasks to get started!
        </div>
      )}
    </div>
  );
};

export default TaskList;