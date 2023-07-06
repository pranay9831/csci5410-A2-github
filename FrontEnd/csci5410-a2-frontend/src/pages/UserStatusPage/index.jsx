import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function UserStatusPage() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {user,setUser}=useContext(UserContext);
    const {status}=useContext(UserContext);
    const navigate = useNavigate();
    console.log(user)

    useEffect(() => {
        // Replace with your actual API endpoint
        fetch('https://statemanagment-microservice-sple5s3g7q-nn.a.run.app/online-users', {origin:'http://localhost:5173/user-status'})
            .then(response => response.json())
            .then(data => setOnlineUsers(data))
            .catch(error => console.error('Failed to fetch online users:', error));
    }, []);

    const handleLogout = async () => {
        // Replace with your actual API endpoint
        try {
            const response = await fetch('https://statemanagment-microservice-sple5s3g7q-nn.a.run.app/logout', { method: 'POST',headers:{
                'Content-Type':'application/json',
            },
        body:JSON.stringify({email:user}) });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <div>
            <h2>User Status Page</h2>
            <h3>{status}</h3>
            <button onClick={handleLogout}>Logout</button>
            <h3>Online Users:</h3>
            <ul>
                {onlineUsers.map((user, index) => (
                    <li key={index}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserStatusPage;
