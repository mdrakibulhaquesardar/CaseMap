// Follow this pattern to import other Firebase services
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// The following fields are REQUIRED and must be defined.
// These values can be found in your Firebase project's web app settings.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
  } else {
    return firebaseConfig;
  }
}
