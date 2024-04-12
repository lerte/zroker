import React from "react";
import { Link } from "react-router-dom";
import { Card, Flex, Text } from "@radix-ui/themes";

const Sidebar = () => {
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
      <Flex
        gap="2"
        direction="column"
      >
        {menus.map((menu) => (
          <Card
            key={menu.to}
            variant="classic"
          >
            <Link to={menu.to}>
              <Text
                as="div"
                size="2"
                weight="bold"
              >
                {menu.title}
              </Text>
            </Link>
          </Card>
        ))}
      </Flex>
    </Card>
  );
};

export default Sidebar;
