import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '~/firebase/config';

export const AuthContext = createContext();
function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, photoURL, email, uid } = user;
                setCurrentUser({
                    displayName,
                    email,
                    photoURL,
                    uid,
                });
                navigate('/');
                return;
            }
            navigate('/login');
        });
        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line
    }, []);
    return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
