import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDei5Pky0F3I2xzuWXmfZ5nAkfyZmYObIg",
    authDomain: "squid-game-store.firebaseapp.com",
    projectId: "squid-game-store",
    storageBucket: "squid-game-store.firebasestorage.app",
    messagingSenderId: "1036502076167",
    appId: "1:1036502076167:web:95fc7e13e53dcadaf993a2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
