import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-3857e.firebaseapp.com",
  projectId: "twitter-clone-3857e",
  storageBucket: "twitter-clone-3857e.appspot.com",
  messagingSenderId: "534638999999",
  appId: "1:534638999999:web:d51349dd03cb462f13890a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getDatabase(app);
// const storage = getStorage(app);

export { auth };


// const firebaseConfig = {
//   apiKey: "AIzaSyCVUb83RhXA4ojX3ldeiztPS1NbY3GM43Y",
//   authDomain: "twitter-clone-3857e.firebaseapp.com",
//   projectId: "twitter-clone-3857e",
//   storageBucket: "twitter-clone-3857e.appspot.com",
//   messagingSenderId: "534638999999",
//   appId: "1:534638999999:web:d51349dd03cb462f13890a"
// };