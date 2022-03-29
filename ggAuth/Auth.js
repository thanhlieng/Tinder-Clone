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
import { auth, db } from "../ggAuth/firebase-con";
import { doc, getDoc } from "firebase/firestore";

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
  const [userData, setData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const snap = await getDoc(doc(db, "userDatas", user.uid));
      setData(snap.data());
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUser();
      } else {
        setUser(null);
      }
      setLoadingIndicator(false);
    });
  }, [user]);

  // if (user) {
  //   useEffect(() => {
  //     async function fetchUser() {
  //       const snap = await getDoc(doc(db, "userDatas", user.uid));
  //       setData(snap.data());
  //     }
  //     fetchUser();
  //   }, []);
  // }

  const SigninGoogle1 = async () => {
    const snap = await getDoc(doc(db, "userDatas", user.uid));
    setData(snap.data());
  };

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
    setData(null);
    setUser(null);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const setUserData = (data) => {
    setData(data);
  };

  const memoValue = useMemo(
    () => ({
      user,
      error,
      Loading,
      Logout,
      SigninGoogle,
      SigninGoogle1,
      userData,
      setUserData,
    }),
    [user, Loading, error, userData]
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
