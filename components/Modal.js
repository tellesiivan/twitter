/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import Moment from "react-moment";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { dbRef } from "../firebase";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

export default function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(doc(dbRef, "posts", postId), (doc) => {
        setPost(doc.data());
      }),
    [postId]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(dbRef, "posts", postId, "comments"), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setIsOpen(false);
    setComment("");

    router.push(`/${postId}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-60 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform shadow-xl bg-slate-900 rounded-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center px-1.5 py-2 border-b border-slate-800">
                <div
                  className="flex items-center justify-center p-0 hoverAnimation w-9 h-9"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="h-5 text-gray-300 " />
                </div>
              </div>
              <div className="flex px-4 py-2.5 sm:px-5">
                <div className="w-full">
                  <div className="relative flex text-gray-300 gap-x-2">
                    <span className="w-[1px] h-full -z-10 absolute left-[23px] top-11 bg-gray-600" />
                    <img
                      src={post?.user.image}
                      alt=""
                      className="p-1 rounded-full w-11 h-11 hoverAnimation "
                    />
                    <div>
                      <div className="inline-flex items-center group">
                        <h4 className="text-xs text-gray-300 font-semibold group-hover:text-[#1d9bf0] hover:cursor-pointer">
                          {post?.user?.name}
                        </h4>
                        <span className={`text-xs ml-1.5 text-gray-500`}>
                          @{post?.user.tag} -{" "}
                        </span>
                        <span className="text-[11px] ml-1.5 text-gray-500">
                          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                      </div>
                      <div className="mt-1">
                        {post?.text && (
                          <p className="mb-1.5 text-sm text-gray-200">
                            {post?.text}
                          </p>
                        )}
                        {post?.image && (
                          <img
                            src={post?.image}
                            className="rounded-lg max-h-[500px] object-cover"
                            alt="Image"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full mb-2 space-x-3 mt-7">
                    <img
                      src={session?.user.image}
                      alt=""
                      className="p-1 rounded-full w-11 h-11 hoverAnimation bg-slate-900"
                    />
                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={`${
                          post?.user.uid === session?.user.uid
                            ? "Replying to yourself..."
                            : `Reply to @${post?.user.tag} post...`
                        } `}
                        rows="2"
                        className="bg-transparent outline-none text-gray-300 text-sm placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                      />
                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          <div className="icon">
                            <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="rotate-90 icon">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon">
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>
                        </div>
                        <button
                          className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
