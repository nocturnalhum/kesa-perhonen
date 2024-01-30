// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA0uM5J0li8jUhpf3eDOOFV_y6geGMxAzk',
  authDomain: 'kesa-perhonen.firebaseapp.com',
  projectId: 'kesa-perhonen',
  storageBucket: 'kesa-perhonen.appspot.com',
  messagingSenderId: '1038022230193',
  appId: '1:1038022230193:web:74c88b54ab7193a57fa290',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
