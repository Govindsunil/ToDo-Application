"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";

function Profile() {
  const { user } = useUserContext();
  const { tasks, completedTasks, activeTasks, openProfileModal } = useTasks();
  return (
    <div className="m-6">
      {/* for profile pic */}
      <div
        className="px-2 py-2 flex items-center gap-2.5 bg-[#f5f1f1] rounded-[20px]
         hover:bg-[#d1d6ee] transition duration-200 easy-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-[#8797f0]"
        onClick={openProfileModal}
      >
        <div>
          <Image
            priority
            src={user?.photo || "/logo.png"}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="flex flex-col text-lg">
            <span className=" font-medium">Hello,</span>
            <span className="font-bold">{user?.name || "Guest"}</span>
          </h1>
        </div>
      </div>
      {/* for profile pic end */}
      {/* showing the number of tasks */}
      <div className="mt-5 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-gray-400">
            <p>Total Tasks:</p>
            <p className=" pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[3px] left-[1px] top-1/2 translate-y-[-50%] bg-blue-300 rounded-[5px]"></span>
              <span className="text-[#0b0b0c] font-medium text-3xl ">
                {tasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>In Progress:</p>
            <p className=" pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[3px] left-[1px] top-1/2 translate-y-[-50%] bg-blue-300 rounded-[5px]"></span>
              <span className="text-[#0b0b0c] font-medium text-3xl ">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Open Task:</p>
            <p className=" pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[3px] left-[1px] top-1/2 translate-y-[-50%] bg-blue-300 rounded-[5px]"></span>
              <span className="text-[#0b0b0c] font-medium text-3xl ">
                {activeTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Completed Task:</p>
            <p className=" pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[3px] left-[1px] top-1/2 translate-y-[-50%] bg-blue-300 rounded-[5px]"></span>
              <span className="text-[#0b0b0c] font-medium text-3xl ">
                {completedTasks.length}
              </span>
            </p>
          </div>
        </div>
      </div>
      <h3 className="mt-5 font-medium ">Activity</h3>
    </div>
  );
}

export default Profile;
