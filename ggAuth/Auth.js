import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as GGAuth from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../ggAuth/firebase-con";

const AuthContext = createContext({});

const config = {
  androidClientId:
    "1073837368078-psrk157kusmclfsne36d3suvh2eb8boa.apps.googleusercontent.com",
  iosClientId:
    "1073837368078-ighgt4hn5i22qgi2ga312123q64e8v1k.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const ContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingIndicator, setLoadingIndicator] = useState(true);
  const [Loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingIndicator(false);
      }),
    []
  );

  const SigninGoogle = async () => {
    setLoading(true);
    await GGAuth.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type == "success") {
          const { idToken, accessToken } = logInResult;
          console.log(accessToken);
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const Logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoValue = useMemo(
    () => ({ user, error, Loading, Logout, SigninGoogle }),
    [user, Loading, error]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!loadingIndicator && children}
    </AuthContext.Provider>
  );
};

export default function Auth() {
  return useContext(AuthContext);
}
