import React, { useState } from 'react';
import axios from 'axios'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        // Successful login
        const data = response.data;
        localStorage.setItem('token', data.token);
        console.log('Login successful:', data);
        // redirect
      } else {
        console.error('Login error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email Address</label> <br/>
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <br />
      <div>
        <label>Password</label> <br/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
