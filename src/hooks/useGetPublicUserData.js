import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { db } from "../../firebase.config";
import { UserAuth } from "../context/AuthContext";

const useGetPublicUserData = () => {
  const UserData = useRef();
  const { userIn } = UserAuth();

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", userIn?.uid);
      const docSnap = await getDoc(docRef);
      UserData.current = docSnap?.data();
    };
    getUserData();
  }, []);

  return UserData.current;
};
export { useGetPublicUserData };
