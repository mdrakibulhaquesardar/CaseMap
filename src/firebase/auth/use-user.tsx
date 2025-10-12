import {Auth, getRedirectResult, onIdTokenChanged, User, updateProfile, getAdditionalUserInfo} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {useAuth} from '../provider';
import { randomUserNames } from '@/lib/dummy-data';

const useUser = () => {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleNewUser = async (user: User) => {
        const randomName = randomUserNames[Math.floor(Math.random() * randomUserNames.length)];
        const randomAvatar = `https://i.pravatar.cc/150?u=${user.uid}`;
        
        try {
            await updateProfile(user, {
                displayName: user.displayName || randomName,
                photoURL: user.photoURL || randomAvatar,
            });
            // After updating, we need to get the user object again to have the latest info
            if (auth.currentUser) {
                await auth.currentUser.reload();
                setUser(auth.currentUser);
            }
        } catch (error) {
            console.error("Error updating profile for new user:", error);
        }
    };
      
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setUser(user);
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
          }
        }
      }).catch((error) => {
        // Handle Errors here.
        console.error("Error during redirect result:", error);
      }).finally(() => {
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, [auth]);

  return {user, isLoading};
};

export {useUser};
