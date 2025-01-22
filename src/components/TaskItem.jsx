import React from 'react';
import { useDispatch } from 'react-redux';
import { Star, Trash2, Calendar } from 'lucide-react';
import { removeTask, updateTask } from '../store/slices/tasksSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };

  const handleToggleImportant = () => {
    dispatch(updateTask({ ...task, important: !task.important }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'low':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleToggle}
          className={`w-5 h-5 rounded border ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300'
          } flex items-center justify-center focus:outline-none`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex flex-col">
          <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {task.title}
          </span>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleToggleImportant}
          className={`p-1 rounded-full hover:bg-gray-100 focus:outline-none ${
            task.important ? 'text-yellow-500' : 'text-gray-400'
          }`}
        >
          <Star className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;