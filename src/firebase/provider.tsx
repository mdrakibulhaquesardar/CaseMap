'use client';
import {FirebaseApp, getApps, initializeApp} from 'firebase/app';
import {Auth} from 'firebase/auth';
import {Firestore} from 'firebase/firestore';
import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import {getFirebaseConfig} from './config';

// The type of the context value
interface FirebaseContextValue {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

// The context
const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined,
);

let firebaseApp: FirebaseApp;

// get the firebase app
export function getFirebase() {
  if (firebaseApp) {
    return firebaseApp;
  }

  const apps = getApps();

  if (apps.length > 0) {
    firebaseApp = apps[0];
  } else {
    const firebaseConfig = getFirebaseConfig();
    firebaseApp = initializeApp(firebaseConfig);
  }

  return firebaseApp;
}

// The provider
export function FirebaseProvider(props: {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}) {
  const {children, ...value} = props;
  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
}

// The hook
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  return useFirebase().firebaseApp;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useFirestore() {
  return useFirebase().firestore;
}
