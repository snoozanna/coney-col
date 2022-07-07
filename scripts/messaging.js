import { getOne, getCollection, getMessages, db } from "./firebase.js";

// getMessages(db);
const messageMount = document.getElementById("messageMount");

const messages = await getMessages(db);
console.log("messages", messages[0]);

// const messages = getCollection("messages");

messageMount.innerHTML = messages[0].text;
