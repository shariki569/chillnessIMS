// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3JjxU01mMmN_47djK6TxWsRGM3mpQEf4",
  authDomain: "chillnessimg.firebaseapp.com",
  projectId: "chillnessimg",
  storageBucket: "chillnessimg.appspot.com",
  messagingSenderId: "176485489681",
  appId: "1:176485489681:web:436dcb0e24c1d5a2e3a5b0",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Firebase
export { storage };

// export const uploadImagetoFirebase = async (uri) => {
//   // Why are we using XMLHttpRequest? See:
//   // https://github.com/expo/expo/issues/2402#issuecomment-443726662
//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (e) {
//       console.log(e);
//       reject(new TypeError("Network request failed"));
//     };
//     xhr.responseType = "blob";
//     xhr.open("GET", uri, true);
//     xhr.send(null);
//   });

//   const filename = image.substring(i)
// };
