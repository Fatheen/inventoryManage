// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "inventory-43c70.firebaseapp.com",
    projectId: "inventory-43c70",
    storageBucket: "inventory-43c70.appspot.com",
    messagingSenderId: "1039505057129",
    appId: "1:1039505057129:web:a03a3ddd9b0d7c066d89f8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
