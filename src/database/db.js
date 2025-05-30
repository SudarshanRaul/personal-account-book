// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js'
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

export const DB_CONST = {
  ACCOUNTS_DB: "accounts",
  CATEGORIES_DB: "categories",
};

const getDbName = (dbName) => {
  return window.location.hostname === "localhost" ? `${dbName}-dev` : dbName;
};

//web app's Firebase configuration
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

const auth = getAuth();
signInAnonymously(auth)
  .then(() => console.log("Signed in!"))
  .catch(error => alert(error));

export const addData = async (dbName, data) => {
  dbName = getDbName(dbName);
  const docRef = await addDoc(collection(db, (dbName)), {
    ...data,
    timestamp: Date.now()
  });
  console.log("Data saved with ID: ", docRef.id);
  return docRef.id;
};

export const updateData = async (dbName, docId, data) => {
  dbName = getDbName(dbName);
  const docRef = doc(db, dbName, docId);
  await updateDoc(docRef, {
    ...data,
    timestamp: Date.now()
  });
  console.log("Data updated with ID: ", docId);
  return docId;
};

export const getDataById = async (dbName, docId) => {
  dbName = getDbName(dbName);
  const docRef = doc(db, dbName, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return { id: docId, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getAllData = async (dbName) => {
  dbName = getDbName(dbName);
  const querySnapshot = await getDocs(collection(db, dbName));
  const data = [];
  
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  
  console.log("All documents in", dbName, ":", data);
  return data;
}
