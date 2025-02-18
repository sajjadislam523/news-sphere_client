import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { PropTypes } from "prop-types";

import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/Firebase.config.js";
import useAxiosPublic from "../hooks/useAxiosPublic.jsx";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                const userInfo = { email: user.email };
                axiosPublic.post("/jwt", userInfo).then((res) => {
                    localStorage.setItem("access-token", res.data.token);
                    setLoading(false);
                });
            } else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        };
    }, [axiosPublic]);

    const contextData = {
        user,
        loading,
        register,
        logIn,
        googleSignIn,
        logOut,
        updateUserProfile,
    };
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
