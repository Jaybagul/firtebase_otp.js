import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCAO3VY-6sTOyUG7tolVKtsPtjowrAHNAY",
    authDomain: "mobile-otp-auth-d20d0.firebaseapp.com",
    projectId: "mobile-otp-auth-d20d0",
    storageBucket: "mobile-otp-auth-d20d0.firebasestorage.app",
    messagingSenderId: "377498184705",
    appId: "1:377498184705:web:36b84bbcd8025e749fa400",
    measurementId: "G-TTK2W8W78J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Named export