import React, { useContext, useEffect, useState } from "react";
import app from "../firebase";
import firebase from "firebase/compat"


const auth = app.auth();

type Context = {
  currentUser?: firebase.User,
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential> | void,
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>  | void,
  logout: () =>  Promise<void>,
  token: string | undefined
 }

const contextDefault: Context = {
  signup: (email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {
    return new Promise(()=>{})
  },
  token: ''
}

const AuthContext = React.createContext<Context>(contextDefault);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider ({ children }: any) {
  const [currentUser, setCurrentUser] = useState<firebase.User>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [signing, setSigning] = useState(false);

  function signup(email: string, password: string) {
    setSigning(true)
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email:string, password: string) {
    setSigning(true)
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setSigning(false);
    setToken(undefined);
    setLoading(true);
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any ) => {
      setCurrentUser(user);
      if (user) {
        const authToken = await user.getIdToken();
        setLoading(false);
        setToken(authToken);
      }
    });
    return unsubscribe;
  }, [signing]);

  // useEffect(() => {
  //   if (token !== 'loading') setLoading(false);
  // }, [token]);


  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, token }}>
      { ( loading || token ) && children }
    </AuthContext.Provider>
  );
}
