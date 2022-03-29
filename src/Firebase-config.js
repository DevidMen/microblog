// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, onAuthStateChanged,updateProfile} from 'firebase/auth'

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9V6_k8xXP1UnHvV6GtT4a9zAuEzDFNi8",
  authDomain: "microblog-3c639.firebaseapp.com",
  projectId: "microblog-3c639",
  storageBucket: "microblog-3c639.appspot.com",
  messagingSenderId: "810061004986",
  appId: "1:810061004986:web:0304ab187b2ee0a1b6c283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

 export const db = getFirestore(app)
 export const auth = getAuth(app)
 export const storage = getStorage(app)
 export const provider = new GoogleAuthProvider()

 export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}