import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [status, setStatus] = useState('offline');

    return (
        <UserContext.Provider value={{ user, setUser, status, setStatus }}>
            {children}
        </UserContext.Provider>
    );
};
