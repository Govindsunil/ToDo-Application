"use client";
import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MiniSidebar() {
  const currentpath = usePathname();

  const getStrokeColor = (link: string) => {
    return currentpath === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];
  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]">
      <div className="flex items-center justify-center h-[5rem]">
        <Image src="/logo.png" width={35} height={35} alt="logo" />
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link}>{item.icon}</Link>
              {/*show the name of the icon */}
              <span className="absolute left-8 top-1/2 -translate-y-1/2 bg-white text-[#13ccbc] text-xs font-semibold px-3 py-1  rounded-[40px] shadow-lg hidden group-hover:block duration-200">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        {/* The delete all button */}
        <div className="mb-[1.5rem] relative group">
          <button className="w-10 h-10 flex flex-col justify-center items-center border-2 p-2 rounded-full border-[#EB4E31]">
            <IconDeleteAll strokeColor="#EB4E31" />
          </button>
          <span className="absolute  left-12 top-1/2 -translate-y-1/2 bg-white text-[#EB4E31] text-xs font-semibold px-3 py-1  rounded-[40px] shadow-lg hidden group-hover:block duration-200 ">
            DeleteAll
          </span>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
