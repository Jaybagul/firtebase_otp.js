import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
require("dotenv").config()


const firebaseConfig = {
    apiKey: `${process.env.APIKEY}`,
    authDomain: `${process.env.authDomain}`,
    projectId: `${process.env.projectId}`,
    storageBucket: `${process.env.storageBucket}`,
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`,
    measurementId: `${process.env.measurementId}`
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Named export