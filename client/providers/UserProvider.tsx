"use client";
import React from "react";
import { UserContextProvider } from "../context/userContext";
import { TaskProvider } from "../context/taskContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  return (
    <UserContextProvider>
      <TaskProvider>{children}</TaskProvider>
    </UserContextProvider>
  );
}

export default UserProvider;
