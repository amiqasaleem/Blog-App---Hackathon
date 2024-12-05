import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";   

import {
    getFirestore,
    collection, 
    addDoc,
    getDocs,
    Timestamp,
    query,
    orderBy,
    limit,
    doc, deleteDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCv2x4EZoVuioHsNbO_5J-JwKBzelT8ZrE",
    authDomain: "blog-app---hackathon.firebaseapp.com",
    projectId: "blog-app---hackathon",
    storageBucket: "blog-app---hackathon.firebasestorage.app",
    messagingSenderId: "908718808749",
    appId: "1:908718808749:web:4f6d112737a5dfd516f024"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export {
    app, 
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    provider,
    signInWithPopup,
    db,
    getFirestore,
    collection, 
    addDoc,
    getDocs,
    Timestamp,
    query,
    orderBy,
    limit,
    doc, deleteDoc
}
