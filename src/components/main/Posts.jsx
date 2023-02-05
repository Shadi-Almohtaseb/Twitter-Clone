import React, { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { AnimatePresence, motion } from "framer-motion";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timeStamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <AnimatePresence>
        {posts.map((post) => {
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3 }}
            >
              <Post post={post} key={post.id} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Posts;
