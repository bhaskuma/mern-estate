// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-cc302.firebaseapp.com",
    projectId: "mern-estate-cc302",
    storageBucket: "mern-estate-cc302.appspot.com",
    messagingSenderId: "21155452791",
    appId: "1:21155452791:web:5e712e529cb3e76db7f372"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);