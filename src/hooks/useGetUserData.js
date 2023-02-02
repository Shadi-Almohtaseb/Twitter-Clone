import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { db } from "../../firebase.config";

const useGetUserData = () => {
  const UserData = useRef();
  const router = useRouter();
  const { user_id } = router.query;

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", user_id);
      const docSnap = await getDoc(docRef);
      UserData.current = docSnap?.data();
    };
    getUserData();
  }, []);
  console.log(UserData);

  return UserData.current;
};
export { useGetUserData };
