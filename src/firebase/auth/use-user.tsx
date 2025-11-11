
import {Auth, getRedirectResult, onIdTokenChanged, User, updateProfile, getAdditionalUserInfo} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {useAuth, useFirestore} from '../provider';
import { randomUserNames } from '@/lib/dummy-data';
import { doc, setDoc } from 'firebase/firestore';

const useUser = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const handleNewUser = async (user: User) => {
        const randomName = randomUserNames[Math.floor(Math.random() * randomUserNames.length)];
        const randomAvatar = `https://i.pravatar.cc/150?u=${user.uid}`;
        
        try {
            await updateProfile(user, {
                displayName: user.displayName || randomName,
                photoURL: user.photoURL || randomAvatar,
            });

            // Create user profile in Firestore
            const userRef = doc(firestore, "users", user.uid);
            await setDoc(userRef, {
              uid: user.uid,
              displayName: user.displayName || randomName,
              email: user.email,
              photoURL: user.photoURL || randomAvatar,
              points: 0,
            }, { merge: true });

            // After updating, we need to get the user object again to have the latest info
            if (auth.currentUser) {
                await auth.currentUser.reload();
                setUser(auth.currentUser);
                setIsVerified(auth.currentUser.emailVerified);
            }
        } catch (error) {
            console.error("Error updating profile for new user:", error);
        }
    };
      
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setUser(user);
      setIsVerified(user?.emailVerified || false);
      setIsLoading(false);
    });

    // Handle the redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          const additionalInfo = getAdditionalUserInfo(result);
          if (additionalInfo?.isNewUser) {
              handleNewUser(user);
          } else {
              setUser(user);
              setIsVerified(user?.emailVerified || false);
          }
        }
      }).catch((error) => {
        // Handle Errors here.
        console.error("Error during redirect result:", error);
      }).finally(() => {
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, [auth, firestore]);

  return {user, isLoading, isVerified};
};

export {useUser};
