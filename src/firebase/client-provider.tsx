'use client';

import {FirebaseProvider, getFirebase} from '@/firebase/provider';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {useMemo} from 'react';

/**
 * Get the firebase app, and memoize it.
 *
 * This is necessary because we want to avoid re-creating the firebase app
 * on every render.
 *
 * We also can't just create it in a global variable, because that would
 * cause it to be created on the server, and we need it on the client.
 *
 * This is the officially recommended way to do it.
 *
 * @see https://github.com/firebase/firebase-js-sdk/issues/4222#issuecomment-681987779
 */
function useFirebaseApp() {
  return useMemo(() => {
    return getFirebase();
  }, []);
}

export function FirebaseClientProvider(props: {children: React.ReactNode}) {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {props.children}
    </FirebaseProvider>
  );
}
