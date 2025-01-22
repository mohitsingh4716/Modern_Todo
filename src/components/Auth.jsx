import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, LogOut } from 'lucide-react';
import { loginSuccess, logout } from '../store/slices/authSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(
        loginSuccess({
          id: '1',
          email,
          name,
        })
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Modern Todo</h1>
        <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-lg">
          <span className="text-gray-700 font-medium">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center  bg-green-50 rounded-lg ">
      <h1 className="text-4xl font-bold text-green-600 mt-3 mb-6">Modern Todo</h1>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-4"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <LogIn className="w-5 h-5" />
          <span>Login</span>
        </button>
      </form>
    </div>
  );
};

export default Auth;
