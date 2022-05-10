import { HiDotsHorizontal } from "react-icons/hi";

export default function SidebarAvatar() {
  return (
    <a
      href="#"
      className="flex-shrink-0 hidden block w-56 mt-auto mb-4 group hoverAnimation lg:inline"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block rounded-full h-9 w-9"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200">
              Tom Cook
            </p>
            <p className="text-xs font-medium text-gray-600 group-hover:text-gray-300">
              View profile
            </p>
          </div>
        </div>
        <HiDotsHorizontal className="text-gray-200" />
      </div>
    </a>
  );
}
