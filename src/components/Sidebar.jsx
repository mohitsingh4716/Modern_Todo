import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClipboardList, Calendar, Star, BookOpen, Users, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';

const Sidebar = ({ onCloseSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  
  const completionPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleItemClick = () => {
    if (window.innerWidth < 768) {
      onCloseSidebar();
    }
  };

  return (
    <div className="w-72 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 bg-green-50  ">
        <div className="mb-2 " >
          <div className=" flex items-center justify-center space-x-3 mb-2 ">
            <img
              src='./pro.svg'
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
         </div>
            <div>
              <h2 className="text-lg font-medium text-center">Hey, {user?.name}</h2>
            </div>
         
        </div>

        <nav className="space-y-2 mb-2 bg-white ">
          <button 
            onClick={handleItemClick}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <ClipboardList className="w-5 h-5" />
            <span>All Tasks</span>
            <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {totalTasks}
            </span>
          </button>
          <button 
            onClick={handleItemClick}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 bg-green-300 rounded-lg"
          >
            <Calendar className="w-5 h-5 " />
            <span>Today</span>
            <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              {tasks.filter(task => task.dueDate === new Date().toISOString().split('T')[0]).length}
            </span>
          </button>
          <button 
            onClick={handleItemClick}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Star className="w-5 h-5" />
            <span>Important</span>
            <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {tasks.filter(task => task.important).length}
            </span>
          </button>
          <button 
            onClick={handleItemClick}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span>Planned</span>
            <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {tasks.filter(task => task.dueDate).length}
            </span>
          </button>
          <button 
            onClick={handleItemClick}
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Users className="w-5 h-5" />
            <span>Assigned to me</span>
          </button>
        </nav>

        <button 
          onClick={handleItemClick}
          className="flex items-center space-x-2 text-gray-700 mb-4 bg-white p-4 w-full"
        >
          <span className="w-6 h-6 flex items-center justify-center border-2 border-gray-400 rounded-lg">+</span>
          <span>Add list</span>
        </button>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Today Tasks</h3>
            <span className="text-gray-400">ⓘ</span>
          </div>
          <div className="text-2xl font-bold mb-4">{pendingTasks}</div>
          <div className="relative h-24 w-24 mx-auto">
            <svg className="transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
              />
            </svg>
          </div>
          <div className="flex justify-center space-x-4 text-sm mt-2">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-gray-200 rounded-full mr-1"></span>
              <span>Pending ({pendingTasks})</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              <span>Done ({completedTasks})</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            handleLogout();
            handleItemClick();
          }}
          className="mt-3 w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;