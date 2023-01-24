"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userIn, setUserIn] = useState({});
  //const [usersList, setUsersList] = useState([]);

  //   useEffect(() => {
  //     const query = ref(db, "users");
  //     return onValue(query, (snapshot) => {
  //       const data = snapshot.val();

  //       if (snapshot.exists()) {
  //         Object.values(data).map((item) => {
  //           setUsersList((usersList) => [...usersList, item]);
  //         });
  //       }
  //     });
  //   }, []);

  //   const addUsers = (result) => {
  //     set(ref(db, 'users/' + usersList.length), {
  //       id: usersList.length,
  //       email: result.user.email,
  //       name: result.user.displayName,
  //       avatar: result.user.photoURL,
  //       imageProfile: 'https://source.unsplash.com/random'
  //     });
  //   }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const userProfile = usersList?.find(u => u.email === result.user.email)
        console.log("Results:", result);
        // if (result.user.email !== userProfile?.email) {
        //   addUsers(result);
        // }
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
