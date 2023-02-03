import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { useRouter } from "next/router";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userIn, setUserIn] = useState({});
  const [usersList, setUsersList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (userIn) {
      router.push("/");
    }
  }, [userIn]);

  useEffect(() => {
    onSnapshot(
      collection(db, "users"),

      (snapshot) => {
        setUsersList([...usersList, snapshot.docs]);
      }
    );
  }, []);

  const addUsers = async (result) => {
    const userRef = await setDoc(doc(db, "users", result.user?.uid), {
      uid: result.user?.uid,
      email: result.user?.email,
      name: result.user?.displayName,
      avatar: result.user?.photoURL,
      imageProfile: "https://source.unsplash.com/random",
    });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result.user?.emailTOP", result.user?.email);
        const userProfile = usersList?.find(
          (u) => u?.email === result.user?.email
        );

        console.log("userProfile", userProfile);
        console.log("result.user?.email", result.user?.email);

        if (result.user?.email !== userProfile?.email) {
          addUsers(result);
          setUsersList([...usersList, result.user]);
          console.log("User added");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandelSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserIn(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    signInWithGoogle,
    HandelSignOut,
    userIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
