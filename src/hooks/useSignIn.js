const { GoogleAuthProvider, signInWithPopup } = require("@firebase/auth");
const { auth } = require("firebase.config");

export function getSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
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
}
