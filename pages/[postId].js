import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { trendingState, followingState } from "../atoms/widgetsAtom";
import { modalState } from "../atoms/modalAtom";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { dbRef } from "../firebase";
import { useRecoilState } from "recoil";
import Post from "../components/posts/Post";
import Comment from "../components/Comment";
import Head from "next/head";

export default function PostPage({ trending, following }) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [trnding, setTrnding] = useRecoilState(trendingState);
  const [fllowing, setFollowing] = useRecoilState(followingState);
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { postId } = router.query;
  setFollowing(following);
  setTrnding(trending);
  // const postQ = doc(dbRef, "posts", postId);

  useEffect(() => {
    if (postId) {
      const commentsQ = query(
        collection(dbRef, "posts", postId, "comments"),
        orderBy("timestamp", "desc")
      );
      try {
        onSnapshot(commentsQ, (snapshot) => {
          const array = [];
          snapshot.docs.map((doc) => array.push({ ...doc.data(), id: doc.id }));

          setComments(array);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      const postQ = doc(dbRef, "posts", postId);
      try {
        onSnapshot(postQ, (doc) => {
          setPost({
            ...doc.data(),
            id: doc.id,
          });
          console.log({
            ...doc.data(),
            id: doc.id,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [postId]);

  return (
    <>
      <Head>
        <title>
          {post?.user?.name} on Twitter: "{post?.text ? post?.text : "Post"}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-white flex-1  sm:ml-[73px] lg:ml-[240px] border-gray-800 sm:border-l md:border-r md:min-w-[500px] lg:min-w-[600px] border-l-none ">
        <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
          <div
            className="flex items-center justify-center p-0 hoverAnimation w-9 h-9"
            onClick={() => router.push("/")}
          >
            <ArrowLeftIcon className="h-4 text-white" />
          </div>
          Tweet
        </div>
        {post !== undefined ? (
          <Post postPage id={post.id} post={post} />
        ) : (
          <span>Loading....</span>
        )}
        {comments.length > 0 && (
          <div className="pb-72">
            {comments.map((comment) => (
              <Comment key={comment.id} id={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const trending = await fetch("https://jsonkeeper.com/b/NKEV").then((res) =>
    res.json()
  );
  const following = await fetch("https://jsonkeeper.com/b/WWMJ").then((res) =>
    res.json()
  );

  return {
    props: {
      trending,
      following,
    },
  };
}
