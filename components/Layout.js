import React from "react";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <main className="flex flex-row min-h-screen bg-black lg:max-w-[1200px] mx-auto w-full">
      {session && <Sidebar />}
      {children}
    </main>
  );
}
