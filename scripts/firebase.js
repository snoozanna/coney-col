// TODO finish firebase integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore-lite.js";

// TODO ADD .ENV
// require("dotenv").config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const FBDocToObj = (doc) => ({ ...doc.data(), _id: doc.id });

// Read
const getOne = async (id = "", collectionName = "") => {
  try {
    return collection(collectionName).get(id);
  } catch (err) {
    console.log("Error for getOne: ", err);
    return Promise.reject(err.message);
  }
};

const getCollection = async (collectionName = "") => {
  try {
    const snapshot = await collection(collectionName).get();
    const docs = snapshot.docs.map((doc) => {
      // console.log("new id", doc.id);
      return FBDocToObj(doc);
    });
    return docs;
    // return snapshot.docs;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

async function getMessages(db) {
  const messageCol = collection(db, "messages");
  try {
    const messageSnapshot = await getDocs(messageCol);
    const messageList = messageSnapshot.docs.map((doc) => {
      return FBDocToObj(doc);
    });
    return messageList;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export { getOne, getCollection, getMessages, app, db };
