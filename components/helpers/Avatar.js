import React from "react";
import { useSession } from "next-auth/react";

export default function Avatar({ styling }) {
  const { data: session } = useSession();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`inline-block h-9 w-9 rounded-full ${styling ?? ""}`}
      src={session.user.image}
      alt=""
    />
  );
}
