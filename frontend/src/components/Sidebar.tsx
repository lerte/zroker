import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, Flex, Text, ScrollArea } from "@radix-ui/themes";

const Sidebar = () => {
  const { pathname } = useLocation();
  const menus = [
    {
      title: "Overview",
      to: "/overview",
    },
    {
      title: "Invite",
      to: "/invite",
    },
    {
      title: "Enable",
      to: "/enable",
    },
    {
      title: "Sharing",
      to: "/sharing",
    },
    {
      title: "Version",
      to: "/version",
    },
  ];

  return (
    <Card className="w-[160px]">
      <ScrollArea scrollbars="vertical">
        <Flex
          gap="2"
          direction="column"
        >
          {menus.map((menu) => (
            <Card
              key={menu.to}
              variant="classic"
              className={pathname == menu.to ? "bg-indigo-500" : ""}
            >
              <Link to={menu.to}>
                <Text
                  as="div"
                  size="5"
                  weight="bold"
                >
                  {menu.title}
                </Text>
              </Link>
            </Card>
          ))}
        </Flex>
      </ScrollArea>
    </Card>
  );
};

export default Sidebar;
