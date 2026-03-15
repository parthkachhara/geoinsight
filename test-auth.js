const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDygdK3_oJKHbAd6YfjOSSlK-eFZN7CYlk",
    authDomain: "geoinsight-dd22f.firebaseapp.com",
    projectId: "geoinsight-dd22f",
    storageBucket: "geoinsight-dd22f.firebasestorage.app",
    messagingSenderId: "349018379825",
    appId: "1:349018379825:web:54563526b9ee225e1ee710",
    measurementId: "G-JB35Y8KEJF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testAuth() {
    try {
        console.log("Attempting to create test user...");
        await createUserWithEmailAndPassword(auth, "testagent123@geoinsight.com", "Password123!");
        console.log("SUCCESS: Created user.");
    } catch (e) {
        console.error("CREATE USER FAILED:", e.code, e.message);
    }
    process.exit(0);
}

testAuth();
