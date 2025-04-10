import React, { use } from "react";
import { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import axios from "axios";
import toast from "react-hot-toast";

const TaskContext = createContext();

const serverUrl = "https://taskonyxtodo.onrender.com/api/v1";

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
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
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
  //get the tasks

  const getTasks = async () => {
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

      // update the task in the tasks array
      const newTasks = tasks.map((tsk) => {
        return tsk._id === res.data._id ? res.data : tsk;
      });

      toast.success("Task updated successfully");

      setTasks(newTasks);
    } catch (error) {
      console.log("Error updating task", error);
    }
  };
  //delete Tasks
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);

      // remove the task from the tasks array
      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
      toast.success("Task deleted successfully");

      setTasks(newTasks);
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };
  // remove all task
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

  // get completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  // get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    getTasks();
  }, [userId]);

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
        activeTasks,
        completedTasks,
        profileModal,
        openProfileModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TaskContext);
};
