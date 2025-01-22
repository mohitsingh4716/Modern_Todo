import React, { useState } from 'react';

import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { ChevronDown } from 'lucide-react';

const TaskManager = () => {
 

  return (
    <div className="p-4 md:p-4 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-auto">
          <div className="w-full md:w-auto appearance-none bg-transparent pr-8 py-2 text-gray-500 hover:text-gray-700 font-medium focus:outline-none">
            To Do
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <ChevronDown/>
          </div>
        </div>
        
       
      </div>

      <div className="max-w-3xl mx-auto">
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}

export default TaskManager;