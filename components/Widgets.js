import { trendingState, followingState } from "../atoms/widgetsAtom";
import { useRecoilState } from "recoil";
import { HiSearch } from "react-icons/hi";
import Image from "next/image";

import Trending from "./Trending";

export default function Widgets() {
  const [trendingItems, setTrending] = useRecoilState(trendingState);
  const [followResults, setFollowing] = useRecoilState(followingState);

  return (
    <div className="sticky top-0 flex-col items-center flex-1 hidden h-full p-2 text-white md:flex lg:items-start space-y-1.5">
      <div className="py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative ">
          <HiSearch className="z-50 text-gray-500" size="1.2em" />
          <input
            type="text"
            className="absolute inset-0 w-full pl-10 text-sm placeholder-gray-500 bg-transparent border border-transparent outline-none text-gray-00"
            placeholder="Search twitter..."
          />
        </div>
      </div>
      <div className="text-gray-300 space-y-3 bg-[#202327] w-11/12 xl:w-9/12 pt-2 rounded-xl overflow-hidden">
        <h4 className="px-2 font-bold text-md">What&#39;s happening</h4>
        {trendingItems.map((r, i) => (
          <Trending key={i} trend={r} />
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>
      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="px-4 text-xl font-bold">Who to follow</h4>
        {followResults.map((result, index) => (
          <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
            key={index}
          >
            <Image
              src={result.userImg}
              width={50}
              height={50}
              objectFit="cover"
              alt=""
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
              Follow
            </button>
          </div>
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>
    </div>
  );
}
