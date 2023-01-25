import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import profileImage from "../../src/assets/Images/SignInImage.png";
import { UserAuth } from "../../src/context/AuthContext";

const SignIn = () => {
  const { signInWithGoogle } = UserAuth();

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

export default SignIn;
