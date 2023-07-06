import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleReg=(e)=>{
    e.preventDefault();
    navigate('/register')

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Login" />
    </form>
    <text>Not an Acocunt? Register</text>
    <button onClick={handleReg}>Register</button>
    </>
  );
}

export default LoginForm;
