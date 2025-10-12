// Follow this pattern to import other Firebase services
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// The following fields are REQUIRED and must be defined.
// These values can be found in your Firebase project's web app settings.
const firebaseConfig = {
  apiKey: "AIzaSyBujhoarXCoR6nCUO8L8c31eJRqaEXNz_g",
  authDomain: "casemap-76f82.firebaseapp.com",
  projectId: "casemap-76f82",
  storageBucket: "casemap-76f82.appspot.com",
  messagingSenderId: "841055036353",
  appId: "1:841055036353:web:1cd001156433a26acfc540",
  measurementId: "G-2XT159JV6Y"
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
  } else {
    return firebaseConfig;
  }
}
