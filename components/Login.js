import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function Login({ providers }) {
  const { google } = providers;

  //  if we have more than one provider we need to map thorough th object = Object.values(providers).map

  return (
    <div className="flex items-center justify-center w-full ">
      <button
        onClick={() => signIn(google.id, { callbackUrl: "/" })}
        className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out rounded-full bg-violet-800 group-hover:w-72 group-hover:h-72"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative flex space-x-3">
          <FcGoogle className="" size="1.2em" />
          <span className="text-sm text-gray-400 group-hover:text-white">
            Sign in with Google
          </span>
        </span>
      </button>
    </div>
  );
}
