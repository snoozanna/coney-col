import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";

import {
  getFirestore,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore-lite.js";

const firebaseConfig = {
  apiKey: "AIzaSyAg0lR1kSjcDYk5BmQNJVo5ywQ5Ln2muUU",
  authDomain: "col-test-10539.firebaseapp.com",
  projectId: "col-test-10539",
  storageBucket: "col-test-10539.appspot.com",
  messagingSenderId: "963826174778",
  appId: "1:963826174778:web:e7c07561a5d560af021e03",
  measurementId: "G-BC72W2G7P9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// BROADCAST

const broadcastMount = document.getElementById("broadcastMount");

const snapshot = onSnapshot(doc(db, "messages", "broadcast"), (doc) => {
  const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, "Current data: ", doc.data());
  const data = doc.data();
  const msg = data.text;
  broadcastMount.innerHTML = msg;
});

// broadcastMount.innerHTML = snapshot.text;
