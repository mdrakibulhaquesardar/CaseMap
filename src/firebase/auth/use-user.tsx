import {Auth, getRedirectResult, onIdTokenChanged, User} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {useAuth} from '../provider';

const useUser = () => {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Handle the redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This is the signed-in user
          const user = result.user;
          setUser(user);
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
