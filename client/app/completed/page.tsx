"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "../Components/Filters/Filters";
import TaskItem from "../Components/TaskItem/TaskItem";
import { Task } from "@/util/types";
import { filteredTasks } from "@/util/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/util/animations";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority, completedTasks } =
    useTasks();

  const filtered = filteredTasks(completedTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className=" m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Completed Tasks </h1>
        <Filters />
      </div>
      <motion.div
        className="pb-[4rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
        >
          Create new task
        </button>
      </motion.div>
    </main>
  );
}
