import { getOne, getCollection, getMessages, db } from "./firebase.js";

// const snapshot = onSnapshot(doc(db, "messages", "broadcast"), (doc) => {
//   console.log("Current data: ", doc.data());
// });

// getMessages(db);
const messageMount = document.getElementById("messageMount");

// const messages = await getMessages(db);

// // const messages = getCollection("messages");

// const currentMessage = messages[messages.length - 1].text;
// messageMount.innerHTML = currentMessage;

// console.log(snapshot);
// messageMount.innerHTML = snapshot.text;
