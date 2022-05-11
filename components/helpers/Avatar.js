import React from "react";

export default function Avatar({ styling }) {
  return (
    <img
      className={`inline-block h-9 w-9 rounded-full ${styling ?? ""}`}
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt=""
    />
  );
}
