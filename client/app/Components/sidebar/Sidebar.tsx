import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";

function Sidebar() {
  return (
    <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-[#f9f9f9] flex flex-col">
      <Profile />
      <div className="mt-4 mx-6">
        <RadialChart />
      </div>
      <button className="mb-4 py-4 px-8 m-6 bg-red-600 rounded-[50px] text-white hover:bg-red-400 duration-200 ease-in-out">
        Sign out
      </button>
    </div>
  );
}

export default Sidebar;
