import React from "react";
import { Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <Flex
      gap="4"
      className="h-dvh p-4"
    >
      <Sidebar />
      <Outlet />
    </Flex>
  );
};
export default Layout;
