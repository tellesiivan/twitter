import React from "react";

export default function Post({ post, postPage }) {
  console.log(post);
  return (
    <div className="flex p-3 px-2 border-b border-gray-800 cursor-pointer sm:px-3">
      {!postPage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={post?.user.image}
          alt={post.user.name}
          className="object-fill w-10 h-10 rounded-full sm:mr-2.5 mr-1.5"
        />
      )}
      <div className="flex flex-col w-full space-y-2">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={post?.user.image}
              alt={post.user.name}
              className="object-fill w-10 h-10 rounded-full sm:mr-2.5 mr-1.5"
            />
          )}
        </div>
      </div>
    </div>
  );
}
