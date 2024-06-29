// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, onValue ,set} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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


// Add event listener to the form
document.getElementById('loginform').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Get the email from the form
    const targetEmail = document.getElementById('email').value;
    const targetpassword = document.getElementById('password').value;

    // Fetch and display user data
    onValue(usersRef, (snapshot) => {
        // const userDataDiv = document.getElementById('userData');
        const loginform = document.getElementById('loginform');
        const newUserRef2 = ref(database, 'activehr/');
        // userDataDiv.innerHTML = ''; // Clear previous content
        if (snapshot.exists()) {
            let found = false;
            snapshot.forEach(childSnapshot => {
                const userData = childSnapshot.val();
                
                // Check if email matches the target email
                if ((userData.email === targetEmail)&(userData.password === targetpassword)) {
                    let dep = userData.role
                    if(dep == "HR"){ 
                        set(newUserRef2, {
                            "kk" : 1
                        }).then(()=>{
                            alert('Saved to New')
                        })
                        window.location.href="hrpage.html"
                    }
                    else{
                        window.location.href="employeepage.html"; // Clear previous content
                    }
                    return; // Exit the forEach loop
                    // Redirect to abc.html
                }
            });

            // if (!found) {
            //     userDataDiv.innerHTML = "No matching email found.";
            // }
        } 
        // else {
        //     userDataDiv.innerHTML = 'No users found.';
        // }
    }, (error) => {
        console.error('Error fetching data:', error);
        // const userDataDiv = document.getElementById('userData');
        // userDataDiv.innerHTML = 'Error fetching data.';
    });
});
