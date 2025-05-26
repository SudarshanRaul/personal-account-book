// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

import Dexie from "dexie";

const dbD = new Dexie("accountBookDB");
dbD.version(1).stores({
  accounts: "++id, name, currentBalance, previousBalance, prevBalanceDate",
  categories: "++id, name, groupId",
  transactions: "++id, accountId, amount, date, categoryId, type",
  receipt: "++id, accountId, date, amount, categoryId, image",
});



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPRSjfYZT8pX-SPpOHQS79sRRHn3_0peg",
  authDomain: "https://sudarshan.js.org",
  projectId: "bookkeeping-f5330",
  storageBucket: "bookkeeping-f5330.firebasestorage.app",
  messagingSenderId: "1031365831822",
  appId: "1:1031365831822:web:6690dc12482e347a792ddf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// firebase.auth().signInAnonymously()
//   .then(() => console.log("Signed in!"))
//   .catch(error => alert(error));

// Example: Add a document
const docRef = await addDoc(collection(db, "messages123"), {
  text: "Hello from Firebase! 123",
  timestamp: Date.now()
});

const updateDocRef = doc(db, "messages123", "BEPEKny4t3RHm73WsDIA")
// const updateDocResp = updateDocRef && await updateDoc(updateDocRef, {
//   text: "Hello from Firebase! 456 updated",
//   timestamp: Date.now()
// });

// console.log("Document updated with ID: ", updateDocResp.id);

console.log("Document written with ID: ", docRef.id);


export default dbD;
