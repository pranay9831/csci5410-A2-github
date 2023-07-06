import React, { useContext } from "react";
import { UserContext } from '../../context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
    const location = useLocation();
    const {user, setUser} = useContext(UserContext);

    if (user) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
}

export default PrivateRoute;
