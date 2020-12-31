import { createContext, useState, useEffect, useContext } from "react";
import nookies from 'nookies';
import Fire from '../config/fire-config';
import axios from 'axios';

const AuthContext = createContext({
  user: null,
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return Fire.auth().onIdTokenChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        nookies.set(undefined, 'token', '');
      } else {
        const token = await firebaseUser.getIdToken();
        
        const { data } = await axios.get("/api/fetch_user/" + firebaseUser.uid);

        //Pending use case (probably going be used for routes that need the user information but are protected already - meaning these data will NOT be used for access control)
        setUser({
            "uid": firebaseUser.uid,
            "email": firebaseUser.email,
            "name": firebaseUser.displayName,
            "permissions": data.permissions
        });
        nookies.set(undefined, 'token', token);
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = Fire.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
    return useContext(AuthContext);
  };