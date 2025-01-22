import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import TaskManager from './components/TaskManager';
import Header from './components/Header';


const AppContent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center ">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-10">
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">

        {isSidebarOpen && <MobileOverlay toggleSidebar={toggleSidebar} />}

        <SidebarWrapper isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <MainContent />
      </div>
    </div>
  );
};

const MobileOverlay = ({ toggleSidebar }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
    onClick={toggleSidebar}
  />
);

const SidebarWrapper = ({ isSidebarOpen, setIsSidebarOpen }) => (
  <div
    className={`fixed md:static inset-y-0 left-0 z-40 transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out md:translate-x-0`}
  >
    <Sidebar onCloseSidebar={() => setIsSidebarOpen(false)} />
  </div>
);

const MainContent = () => (
  <div className="flex-1">
    <TaskManager />
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
