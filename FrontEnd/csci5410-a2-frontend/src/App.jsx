import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login';
import RegistrationPage from './pages/RegistrationPage/index';
import UserStatusPage from './pages/UserStatusPage/index';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute/index';

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element ={<LoginPage/>}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/user-status" element={<PrivateRoute><UserStatusPage /></PrivateRoute>} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
