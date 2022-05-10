import React from "react";

export default function SidebarLink({ text, Icon, active }) {
  return (
    <div
      className={`flex items-center space-x-4 text-lg text-gray-300 xl:justify-start hoverAnimation ${
        active && "font-bold"
      }`}
    >
      <Icon className="text-white" size="1.6rem" />
      <span className="hidden lg:inline-flex">{text}</span>
    </div>
  );
}
