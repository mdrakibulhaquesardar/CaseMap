import {Auth, onIdTokenChanged, User} from 'firebase/auth';
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

    return () => unsubscribe();
  }, [auth]);

  return {user, isLoading};
};

export {useUser};
