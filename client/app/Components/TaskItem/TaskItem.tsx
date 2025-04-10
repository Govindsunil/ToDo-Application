import { useTasks } from "@/context/taskContext";
import { editicon, staricon, trashicon } from "@/util/icon";
import { Task } from "@/util/types";
import { formatTime, formatTimeDue } from "@/util/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/util/animations";

interface TaskItemProps {
  task: Task;
}
function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-red-500";
    }
  };
  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();
  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <div className="mr-3 flex justify-between items-center">
          <h4 className="pb-1 font-bold text-2xl hidescorllbar h-[2.5rem] overflow-y-auto text-ellipsis  max-w-[15rem]">
            {/* text-ellipsis overflow-hidden whitespace-nowrap max-w-[15rem]
            font-bold text-2xl*/}
            {task.title}
          </h4>
          <p className="text-sm text-gray-400">
            Due: {formatTimeDue(task.dueDate)}
          </p>
        </div>

        <p className="hidescorllbar h-[9.2rem] overflow-y-auto">
          {task.description}
        </p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">
          created:{formatTime(task.createdAt)}
        </p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              {staricon}
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              {editicon}
            </button>
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trashicon}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
