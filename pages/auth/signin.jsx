"use client";
//import { signInWithGoogle } from "@/hooks/useSignIn";
// import { UserAuth } from "@/context/AuthContext";
// import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
// import { auth } from "firebase.config";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import profileImage from "../../src/assets/Images/SignInImage.png";
import { UserAuth } from "../../src/context/AuthContext";

const SignIn = () => {
  const { signInWithGoogle } = UserAuth();

  // const signInWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // const userProfile = usersList?.find(u => u.email === result.user.email)
  //       console.log("Results:", result);
  //       // if (result.user.email !== userProfile?.email) {
  //       //   addUsers(result);
  //       // }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //const navigate = useNavigate();
  // const SignInWithGoogle = use(getSignInWithGoogle());

  const handelSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className=" my-10">
      <div className="flex flex-col items-center justify-center gap-6">
        <LockClosedIcon color="#8aa5f5" width={120} />
        <Image src={profileImage} width={400} />
        <button
          onClick={handelSignIn}
          className="py-3 px-8 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xl transition-all"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

// export function getSignInWithGoogle() {
//   const provider = new GoogleAuthProvider();
//   return signInWithPopup(auth, provider)
//     .then((result) => {
//       // const userProfile = usersList?.find(u => u.email === result.user.email)
//       console.log("Results:", result);
//       // if (result.user.email !== userProfile?.email) {
//       //   addUsers(result);
//       // }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export default SignIn;
