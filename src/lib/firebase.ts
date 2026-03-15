import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDygdK3_oJKHbAd6YfjOSSlK-eFZN7CYlk",
    authDomain: "geoinsight-dd22f.firebaseapp.com",
    projectId: "geoinsight-dd22f",
    storageBucket: "geoinsight-dd22f.firebasestorage.app",
    messagingSenderId: "349018379825",
    appId: "1:349018379825:web:54563526b9ee225e1ee710",
    measurementId: "G-JB35Y8KEJF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
