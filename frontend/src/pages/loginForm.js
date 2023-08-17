import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        userEmail: email,
        password: password,
      });

      const userID = response.data.userID;

      localStorage.setItem('userID', userID);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        console.log('Login successful:', data.userType);
        console.log('Login successful:', data);

        if (data.userType === 'Student') {
          navigate('/studentInterface');
        } else if (data.userType === 'Teacher') {
          navigate('/teacherInterface');
        } else {
          console.log('Login unsuccessful: Unknown userType', data.userType);
          alert('Invalid Login');
        }
      } else {
        console.error('Login error:', response.data);
        alert('Invalid Login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
        <div className='border-2 border[#1F2937] p-16'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email Address</label> <br />
              <input type="email" placeholder="Email Address" className='border-2 border[#1F2937] w-[250px] h-[35px]' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />
            <div>
              <label>Password</label> <br />
              <input type="password" placeholder="password" className='border-2 border[#1F2937] w-[250px] h-[35px]' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <button type="submit" className='bg-[#5850EC] pr-20 pl-20 pt-2 pb-2 text-white w-[250px] h-[35px] font-bold'>Sign in</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
