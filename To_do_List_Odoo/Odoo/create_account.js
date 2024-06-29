// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4HTcKUQ_6Fi-dmIh6ulOkeajnQ3X7WMY",
    authDomain: "todolist-167f5.firebaseapp.com",
    databaseURL: "https://todolist-167f5-default-rtdb.firebaseio.com",
    projectId: "todolist-167f5",
    storageBucket: "todolist-167f5.appspot.com",
    messagingSenderId: "10063925137",
    appId: "1:10063925137:web:50e81fe92a6115e2485430",
    measurementId: "G-R0YQ954022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to create account
window.createAccount = function() {
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    const newUserRef = ref(database, 'users/' + name);
    set(newUserRef, {
        name: name,
        password: password,
        email : email,
        role: role
    }).then(() => {
        alert('Account created successfully!');
    }).catch((error) => {
        console.error('Error creating account:', error);
    });
}
