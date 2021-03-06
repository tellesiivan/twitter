import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { IoClose } from "react-icons/io5";
import {
  HiOutlinePhotograph,
  HiOutlineChartBar,
  HiOutlineEmojiHappy,
  HiOutlineCalendar,
} from "react-icons/hi";
import UploadImageFile from "../../utils/fb/UploadImageFile";

export default function NewPostInput() {
  const { data: session } = useSession();
  const filePickerRef = useRef(null);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const data = {
      text: input,
      user: {
        ...session.user,
      },
    };

    await UploadImageFile(data, selectedFile);

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImgToPost = (e) => {
    const file = e.target.files[0];

    // setSelectedFile(URL.createObjectURL(file));
    // console.log(URL.createObjectURL(file));
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div
      className={`border-b border-gray-800 px-2 py-4  sm:px-3 flex space-x-3 overflow-y-scroll ${
        loading && "opacity-60"
      }`}
    >
      <Avatar styling="mr-1.5 sm:mr-2.5" />
      <div className="w-full divide-y divide-gray-800">
        <div className={`${setSelectedFile && "pb-2"}`}>
          <textarea
            rows="2"
            className="w-full text-sm tracking-wide text-gray-400 bg-transparent outline-none placeholder:text-gray-500 min-h-[50px]"
            placeholder="What's happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#bfbfbf] hover:bg-[#bcbcbc] bg-opacity-75 rounded-full  flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <IoClose className="text-gray-600" />
              </div>
              {/*   eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedFile}
                alt="upload file input"
                className="object-contain select-none rounded-2xl max-h-80"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5 w-full">
            <div className="flex items-center">
              <div
                className={`icon text-[#1d9bf0] ${
                  selectedFile ? "cursor-not-allowed " : "cursor-pointer"
                }`}
              >
                <HiOutlinePhotograph
                  className=""
                  size="1.3em"
                  onClick={() => filePickerRef.current.click()} // reference the click to trigger the file input (ref === filePickerRef)
                />
                <input
                  type="file"
                  className=""
                  disabled={selectedFile}
                  hidden
                  accept="image/*"
                  onChange={addImgToPost}
                  ref={filePickerRef}
                />
              </div>
              <div className="rotate-90 icon">
                <HiOutlineChartBar size="1.3em" className="text-[#1d9bf0]" />
              </div>
              <div className="icon">
                <HiOutlineEmojiHappy size="1.3em" className="text-[#1d9bf0]" />
              </div>
              <div className="icon">
                <HiOutlineCalendar size="1.3em" className="text-[#1d9bf0]" />
              </div>
            </div>
            <button
              className="bg-[#1d9bf0] py-1.5 px-5 rounded-full text-sm font-semibold text-white tracking-wide disabled:cursor-not-allowed disabled:opacity-60 select-none hover:opacity-80"
              disabled={input.trim() === "" && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
