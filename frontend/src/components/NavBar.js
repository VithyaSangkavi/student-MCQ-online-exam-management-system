import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookImage from '../images/book.png';

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUser({ userName: storedUserName });
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/logout', {
        token: localStorage.getItem('token'),
      });

      if (response.status === 200) {
        localStorage.removeItem('userName'); 
        setUser(null); 
        navigate('/'); 
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="logo">
          <img src={BookImage} alt="Logo" className="h-8" />
        </div>
        <div className="ml-2">
          <h1 className="text-xl">Online Examination System</h1>
        </div>
      </div>
      <ul className="flex space-x-4 jusify-center">
        <li><a href="#" className="hover:text-gray-300">Home</a></li>
        <li><a href="#" className="hover:text-gray-300">About</a></li>
        <li><a href="#" className="hover:text-gray-300">Services</a></li>
        <li><a href="#" className="hover:text-gray-300">Contact</a></li>
        <li></li>
        <li></li>
        <li></li>
        {user ? (
          <>
            <li><span className="text-gray-300">Hello, {user.userName}</span></li>
            <li><button onClick={handleLogout} className="hover:text-gray-300 border px-4 py-2 rounded-lg">Logout</button></li>
          </>
        ) : (
          <li><a href="/login" className="hover:text-gray-300 border px-4 py-2 rounded-lg">Login</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
