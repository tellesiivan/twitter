import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <main className="flex min-h-screen bg-black max-w-[1800px] mx-auto">
      <Sidebar />
    </main>
  );
}
