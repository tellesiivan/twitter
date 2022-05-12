import { HiOutlineSparkles } from "react-icons/hi";
import NewPostInput from "./helpers/NewPostInput";
import { useState, useEffect } from "react";
import { dbRef } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import PostsList from "./posts/PostsList";

export default function Feed() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const q = query(collection(dbRef, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setPost(posts);
    });
  }, []);

  return (
    <div className="flex-1  sm:ml-[73px] lg:ml-[240px] border-gray-800 sm:border-l md:border-r md:min-w-[500px] lg:min-w-[600px] border-l-none">
      <div className="sticky top-0 flex items-center px-2 py-4 text-gray-300 border-b border-gray-800 sm:px-3 sm:justify-between ">
        <h2 className="font-semibold text-md sm:text-xl">Home</h2>
        <div className="flex items-center justify-center w-10 h-10 ml-auto hoverAnimation lg:px-0">
          <HiOutlineSparkles size="1.3em" />
        </div>
      </div>
      <NewPostInput />
      <div className="pb-20 ">
        {posts.length > 0 ? (
          <PostsList posts={posts} />
        ) : (
          <span className="text-white text-md">There are no posts</span>
        )}
      </div>
    </div>
  );
}
