import React, { useState } from 'react';
import Crossword from './components/Crossword';
import './App.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  

  const handleLogin = async () => {
    try {
      let response = await fetch('https://crossword-arvx.vercel.app/login/');
      let data = await response.json();
      
      const matchingUser = data.find((user) => user.email === email && user.password === password);
      

      if (matchingUser) {
        setIsLoggedIn(true);
        
      } else {
        setMessage('Authentication failed');
      }
    } catch (error) {
      setMessage('Authentication failed');
    }
  };
  if (isLoggedIn) {
    return <Crossword />;
  }

  return (
    <div className="login-container">
      <h2 style={{color:'black'}}>Login</h2>
      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p style={{color:'red'}}>{message}</p>
    </div>
  );
};

export default Login;
