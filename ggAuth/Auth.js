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
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
} from "firebase/database";

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
  const [likedData, setLiked] = useState(null);
  const [matchData, setMatch] = useState(null);
  const [chatrooms, setchatrooms] = useState(null);

  useEffect(() => {
    async function fetchUserdata() {
      const snap = await getDoc(doc(db, "userDatas", user.uid));
      setData(snap.data());
      if (snap.data()) {
        const realtime = getDatabase();
        const starCountReffLike = ref(realtime, `${user.uid}/liked`);
        onValue(starCountReffLike, (snapshot) => {
          const data = snapshot.val();
          setLiked(data);
        });
        const starCountRefMatch = ref(realtime, `${user.uid}/match`);
        onValue(starCountRefMatch, (snapshot) => {
          const data = snapshot.val();
          setMatch(data);
        });
        const starCountRefChat = ref(realtime, `${user.uid}/chatrooms`);
        onValue(starCountRefChat, (snapshot) => {
          const data = snapshot.val();
          setchatrooms(data);
        });
        setLoadingIndicator(false);
      } else {
        setLoadingIndicator(false);
      }
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserdata();
      } else {
        setUser(null);
        setData(null);
        setLiked(null);
        setMatch(null);
        setLoadingIndicator(false);
      }
    });
  }, [user, userData]);

  // if (user) {
  //   useEffect(() => {
  //     async function fetchUser() {
  //       const snap = await getDoc(doc(db, "userDatas", user.uid));
  //       setData(snap.data());
  //     }
  //     fetchUser();
  //   }, []);
  // }

  // const SigninGoogle1 = async () => {
  //   const snap = await getDoc(doc(db, "userDatas", user.uid));
  //   setData(snap.data());
  // };

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
    setUser(null);
    setData(null);
    setLiked(null);
    setMatch(null);
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
      userData,
      setUserData,
      likedData,
      matchData,
      chatrooms,
    }),
    [user, Loading, error, userData, likedData, matchData, chatrooms]
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
