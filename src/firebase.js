// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5cdheVMTsVGOswAnCMuQPUUD21lUJQ98",
  authDomain: "react-recipe-app-8945a.firebaseapp.com",
  projectId: "react-recipe-app-8945a",
  storageBucket: "react-recipe-app-8945a.appspot.com",
  messagingSenderId: "427602553809",
  appId: "1:427602553809:web:5310aa9bc75d31befc4ef0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
