// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBybMnIuPAOEuAE1ROdFu0IEa6_8fCmI1s",
  authDomain: "kalakopi-a0602.firebaseapp.com",
  projectId: "kalakopi-a0602",
  storageBucket: "kalakopi-a0602.appspot.com",
  messagingSenderId: "123568132156",
  appId: "1:123568132156:web:47e1e88015161817203339",
  measurementId: "G-WKMYT7JG5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { storage };