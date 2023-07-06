import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loc, setLocation] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password,name,loc });
  };

  const handlelog=(e)=>{
    e.preventDefault();
    navigate('/login')

  }
  return (
    <><form onSubmit={handleSubmit}>
    <label>
      Email:
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <label>
      Password:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    </label>
    <label>
      Name:
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </label>
    <label>
      Location:
      <input type="text" value={loc} onChange={e => setLocation(e.target.value)} />
    </label>
    
    <input type="submit" value="Register" />
  </form>
   <div>Already Account? Login
   <button onClick={handlelog}>Login</button>
   </div></>
  );
}

export default RegistrationForm;
