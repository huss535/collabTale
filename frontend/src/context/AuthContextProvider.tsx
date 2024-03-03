import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../Firebase";

// Define the AuthContext
const AuthContext = createContext<any>(null);

// Define the AuthContextProvider component
export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<string | null>(() => {
        // Retrieve user ID from local storage when component mounts
        return localStorage.getItem('userId');
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set up listener for authentication state changes
        const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const userId = firebaseUser.uid;
                setUser(userId);
                // Store the user ID in local storage
                localStorage.setItem('userId', userId);
            } else {
                setUser(null);
                // Remove the user ID from local storage
                localStorage.removeItem('userId');
            }
            setLoading(false);
        });

        // Clean up listener on component unmount
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

// Define the useAuth hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
