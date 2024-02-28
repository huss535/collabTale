import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../Firebase";

// Define the AuthContext
const AuthContext = createContext<any>(null);

// Define the AuthContextProvider component
export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>({});


    auth.onAuthStateChanged(firebaseUser => {
        console.log(firebaseUser);
        setUser(firebaseUser);
    });
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

// Define the useAuth hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
