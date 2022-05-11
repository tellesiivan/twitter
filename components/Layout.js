import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <main className="flex flex-row min-h-screen bg-black lg:max-w-[1200px] mx-auto w-full">
      <Sidebar />
      {children}
    </main>
  );
}
