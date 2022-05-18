import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";

function Comment({ comment }) {
  return (
    <div className="flex p-3 border-b border-gray-700 cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={comment?.userImg}
        alt=""
        className="mr-4 rounded-full h-11 w-11"
      />
      <div className="flex flex-col w-full space-y-2">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-gray-300 text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm "> @{comment?.tag} </span>
            </div>{" "}
            ·{" "}
            <span className="text-sm hover:underline ">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-gray-300 mt-0.5 max-w-lg overflow-scroll text-sm">
              {comment?.comment}
            </p>
          </div>
          <div className="flex-shrink-0 icon group">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="text-sm group-hover:text-pink-600"></span>
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
