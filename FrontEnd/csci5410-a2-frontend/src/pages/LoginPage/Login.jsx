import React, { useContext, useState } from 'react';
import LoginForm from '../../components/LoginForm';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
function LoginPage() {
    const {setUser}=useContext(UserContext);
    const {setStatus}=useContext(UserContext)
   
    const navigate=useNavigate();

    const handleLogin = async ({ email, password }) => {
        try {
            const response = await fetch('https://login-microservice-sple5s3g7q-uc.a.run.app/login', {
                method: 'POST',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ "email":email, "password":password })
            });
    
            
                if (!response.ok) {
                    // check if the status code is 400, if yes then throw an error with a custom message
                    if(response.status === 400){
                        throw new Error('Invalid credentials');
                    } else {
                        throw new Error('Login failed');
                    }
                }
            
    
            const data = await response.json();
            console.log(data);
    
            setUser(email)
            setStatus('online')
            navigate('/user-status');
        } catch (error) {
            alert(error.message);
            
        }
    };
    

    return (

        <div>
            <h1>Login</h1>
            <LoginForm onLogin={handleLogin} />
        </div>
        
        // <form onSubmit={handleSubmit}>
        //     <label>
        //         Email:
        //         <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        //     </label>
        //     <label>
        //         Password:
        //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <input type="submit" value="Login" />
        // </form>
    );
}

export default LoginPage;
