"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
import Link from "next/link";
import { daynight, giticon, profileicon } from "@/util/icon";
import { useTasks } from "@/context/taskContext";
import { useRouter } from "next/navigation";

function Header() {
  const { user, logoutUser } = useUserContext();
  const { tasks, completedTasks, activeTasks, openModalForAdd } = useTasks();
  const { name } = user;
  const userId = user._id;
  const router = useRouter();

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9 ]">
      <div className="">
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome back, ${name}` : "Welcome to your task manager"}
        </h1>
        <p className="text-sm ">
          {userId ? (
            <>you have {activeTasks.length} active tasks</>
          ) : (
            "Please Login to see your tasks"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[4rem]">
        <div className="flex gap-4">
          <button
            className="px-8 py-2 bg-[#3aafae] hover:bg-[#8797f0] text-white rounded-[40px] flex items-center justify-center gap-2 duration-200 easy-in-out "
            onClick={() => {
              if (userId) {
                {
                  openModalForAdd();
                }
              } else {
                router.push("/login");
              }
            }}
          >
            {userId ? "Add Task " : "Login"}
          </button>
          {userId && (
            <button
              className="px-8 py-2 bg-red-600 rounded-[50px] text-white hover:bg-red-400 duration-200 ease-in-out"
              onClick={logoutUser}
            >
              Sigin out
            </button>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/Govindsunil"
            passHref
            target="blank"
            rel=""
            className="h-[40px] w-[40px] flex items-center justify-center rounded-full hover:bg-[#8797f0] border-2 border-[#E6E6E6] duration-200 easy-in-out"
          >
            {giticon}
          </Link>
          <Link
            href=""
            passHref
            target=""
            rel=""
            className="h-[40px] w-[40px] flex items-center justify-center rounded-full hover:bg-[#8797f0] border-2 border-[#E6E6E6] duration-200 easy-in-out"
          >
            {daynight}
          </Link>
          <Link
            href=""
            passHref
            target=""
            rel=""
            className="h-[40px] w-[40px] flex items-center justify-center rounded-full hover:bg-[#8797f0] border-2 border-[#E6E6E6] duration-200 easy-in-out"
          >
            {profileicon}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
