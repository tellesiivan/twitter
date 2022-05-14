import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  HiDotsHorizontal,
  HiOutlineChat,
  HiOutlineTrash,
  HiOutlineSwitchHorizontal,
  HiHeart,
  HiOutlineShare,
  HiOutlineHeart,
  HiOutlineChartBar,
} from "react-icons/hi";
import { dbRef } from "../../firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atoms/modalAtom";

export default function Post({ post, postPage, id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const q = collection(dbRef, "posts", id, "likes");
    onSnapshot(q, (docSnapshot) => {
      setLikes(docSnapshot.docs);
    });
  }, []);

  useEffect(
    () =>
      setLiked(likes.findIndex((like) => like.id === session.user?.uid) !== -1),
    [likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(dbRef, "posts", id, "likes", session.user.uid)); // delete the user logged in from the likes collection
    } else {
      await setDoc(doc(dbRef, "posts", id, "likes", session.user.uid), {
        // we set a sub "likes" collection and add the id us the session user that liked it and store their name as data
        user: session.user.name,
      });
    }
  };

  return (
    <div
      className="flex p-3 px-2 border-b border-gray-800 cursor-pointer sm:px-3"
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={post?.user.image}
          alt={post.user.name}
          className=" w-10 h-10 rounded-full sm:mr-2.5 mr-1.5"
        />
      )}
      <div className="flex flex-col w-full space-y-2">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={post?.user.image}
              alt={post.user.name}
              className=" w-10 h-10 rounded-full sm:mr-2.5 mr-1.5"
            />
          )}
          <div className="text-gray-500">
            <div className="inline-flex items-center group">
              <h4
                className={`text-xs text-gray-300 font-semibold group-hover:text-[#1d9bf0] ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.user.name}
              </h4>
              <span className={`text-xs ${!postPage && "ml-1.5"}`}>
                @{post?.user.tag} -{" "}
              </span>
            </div>
            <span className="text-[11px] ml-1.5">
              <Moment fromNow>{post.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && post.text != " " && (
              <p className="mt-1 text-sm text-gray-100">{post?.text}</p>
            )}
          </div>
          <div className="ml-auto icon group">
            <HiDotsHorizontal className="text-gray-500" />
          </div>
        </div>
        {postPage && <p className="mt-1 text-sm text-gray-100">{post?.text}</p>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post?.image}
          alt=""
          className="rounded-lg max-h-[700px] object-cover"
        />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <HiOutlineChat className="h-5 group-hover:text-[#1d9bf0] " />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {session.user.uid == post?.user.uid ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(dbRef, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <HiOutlineTrash className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <HiOutlineSwitchHorizontal className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HiHeart className="h-5 text-pink-600" />
              ) : (
                <HiOutlineHeart className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <HiOutlineShare className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <HiOutlineChartBar className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}
