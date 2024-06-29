// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase configuration
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

// Reference to 'users' node in Firebase Realtime Database
const usersRef = ref(database, 'users');

// Fetch and display user data
get(onValue(usersRef, (snapshot) => {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = ''; // Clear previous content

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const userId = childSnapshot.key;
            const userData = childSnapshot.val();

            // Display user data (example: append to a <div>)
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<strong>User ID:</strong> ${userId}<br>
                                 <strong>Name:</strong> ${userData.name}<br>
                                 <strong>Email:</strong> ${userData.email}<br>
                                 <strong>Role:</strong> ${userData.role}<br><br>`;
            userDataDiv.appendChild(userDiv);
            // if(userData.email == "abdfjhc"){
            //     userDiv.innerHTML = "found"
            //     return false
            // }
            // else{
            //     userDiv.innerHTML = "Not Found"
            // }
        });
    } else {
        userDataDiv.innerHTML = 'No users found.';
    }
}), {
    onlyOnce: true // Fetch data only once
}).catch((error) => {
    console.error('Error fetching data:', error);
});
