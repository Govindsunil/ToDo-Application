"use client";
import MiniSidebar from "@/app/Components/MiniSidebar/MiniSidebar";

import { useUserContext } from "@/context/userContext";
import React from "react";

function MiniSideProvider() {
  const userId = useUserContext().user._id;
  return <>{userId && <MiniSidebar />}</>;
}

export default MiniSideProvider;
