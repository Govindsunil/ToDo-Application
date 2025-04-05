"use client";

import { useUserContext } from "@/context/userContext";
import { useState } from "react";
import useRedirect from "@/hooks/useUserRedirect";
import ChangePasswordForm from "./Components/auth/ChangePasswordForm/ChangePasswordForm";

export default function Home() {
  useRedirect("/login");
  const {
    logoutUser,
    user,
    handlerUserInput,
    userState,
    updateUser,
    emailVerification,
    allUsers,
    deleteUser,
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;
  // state
  const [isOpen, setIsOpen] = useState(false);
  // function
  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="py-[2rem] mx-[.5rem] min-h-screen bg-gray-50">
      <header>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Todo App</h1>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src={photo}
                  alt={name}
                  className="w-[40px] h-[40px] rounded-full "
                ></img>
                <span className="text-gray-700">Welcome, {user?.name}</span>

                {!isVerified && (
                  <button
                    className="
                    px-4 py-2 rounded bg-blue-500
                     text-white hover:bg-blue-600 
                     transition-colors"
                    onClick={emailVerification}
                  >
                    <span className="hidden sm:inline">Verify Account</span>
                    <span className="sm:hidden">Verify</span>
                  </button>
                )}
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add your dashboard content here */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">Total Tasks</h3>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">Completed Tasks</h3>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-900">Pending Tasks</h3>
              <p className="text-2xl font-bold text-yellow-600">0</p>
            </div>
          </div>
        </div>
      </div>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>
        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-[#2ECC71] text-white rounded-md"
          >
            Update Bio
          </button>
        </h1>
        {isOpen && (
          <form className="mt-4 px-8 py-4 max-w-[520px] w-full rounded-md">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#999]">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
                onChange={(e) => handlerUserInput("bio")(e)}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4 px-4 py-2  bg-blue-500 text-white rounded-md"
            >
              Update Bio
            </button>
          </form>
        )}
      </section>
      <div className="mt-4 flex gap-8">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
      </div>

      <div className="flex-1">
        {user.role === "admin" && (
          <ul>
            {allUsers.map(
              (user: any, i: number) =>
                user.role !== "admin" && (
                  <li
                    key={i}
                    className="mb-2 px-2 py-3 border grid grid-cols-4 items-center gap-8 rounded-md"
                  >
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-[40px]  h-[40px] rounded-full"
                    />
                    <p>{user.name}</p>
                    <p>{user.bio}</p>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      Delete User
                    </button>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </main>
  );
}
