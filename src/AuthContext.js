import React, { createContext, useContext, useState, useEffect } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const ADMIN_EMAIL = "deepbodo5@gmail.com";

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAdmin =
        currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    const signup = async (email, password, displayName) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Create user profile in Firestore
        await setDoc(doc(db, "users", cred.user.uid), {
            email,
            displayName: displayName || "",
            createdAt: serverTimestamp(),
            role: email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user",
        });
        // Send email verification
        await sendEmailVerification(cred.user);
        return cred;
    };

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const resendVerification = () => {
        if (currentUser && !currentUser.emailVerified) {
            return sendEmailVerification(currentUser);
        }
    };

    // Fetch user profile from Firestore
    const fetchProfile = async (user) => {
        if (!user) {
            setUserProfile(null);
            return;
        }
        try {
            const snap = await getDoc(doc(db, "users", user.uid));
            if (snap.exists()) {
                setUserProfile({ id: snap.id, ...snap.data() });
            } else {
                // Create profile if missing (e.g. admin first login)
                const profile = {
                    email: user.email,
                    displayName: user.displayName || "",
                    createdAt: serverTimestamp(),
                    role:
                        user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
                            ? "admin"
                            : "user",
                };
                await setDoc(doc(db, "users", user.uid), profile);
                setUserProfile({ id: user.uid, ...profile });
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
            setUserProfile(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            fetchProfile(user);
            setLoading(false);
        });
        return unsubscribe;
        // eslint-disable-next-line
    }, []);

    const value = {
        currentUser,
        userProfile,
        isAdmin,
        signup,
        login,
        logout,
        resendVerification,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
