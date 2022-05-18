import React from "react";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import Widgets from "./Widgets";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "./Modal";
export default function Layout({ children }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <main className="flex flex-row min-h-screen bg-black lg:max-w-[1200px] mx-auto w-full">
      {session && <Sidebar />}
      {children}
      <Widgets />
      {isOpen && <Modal />}
    </main>
  );
}
