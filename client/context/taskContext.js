"use client";
import React, { use } from "react";
import { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import axios from "axios";
import toast from "react-hot-toast";

const TaskContext = createContext();

const serverUrl =
  process.env.REACT_APP_SERVER_URL || "http://localhost:8000/api/v1";

export const TaskProvider = ({ children }) => {
  const userId = useUserContext().user._id;
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [task, setTask] = React.useState({});
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };
  const openModalForEdit = (task) => {
    setModal("edit");
    setIsEditing(true);
    setActiveTask(task);
    setTask({});
  };
  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };
  //get the task

  const getTasks = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);
      // /${taskId}
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("error in getting tasks", error);
    }
    setLoading(false);
  };
  // get the task
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.log("error in getting task", error);
    }
    setLoading(false);
  };
  // create task
  const createTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task);

      toast.success("Task created successfully");

      setTasks([...tasks, res.data]);
    } catch (error) {
      console.log("error in creating task", error);
    }
    setLoading(false);
  };

  //update task
  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
      const updatedTasks = tasks.map((t) => {
        return t._id === task._id ? res.data : t;
      });
      toast.success("Task updated successfully");

      setTasks(updatedTasks);
    } catch (error) {
      console.log("error in updating task", error);
    }
  };

  //delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);
      // delete the task from the tasks array
      const updatedTasks = tasks.filter((t) => {
        t._id !== taskId;
      });
      setTasks(updatedTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("error in deleting task", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [userId]);

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        task,
        tasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        profileModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TaskContext);
};
