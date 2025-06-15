import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile,logoutUser } from '../features/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchProfile(dispatch);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {user ? (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Welcome, {user.name} 👋</h2>
          <p className="text-gray-600 mb-6">You are logged in as <span className="font-semibold text-blue-600">{user.role}</span></p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : 
        <>
        
        </>
      }
    </div>
  );
};

export default Profile;
