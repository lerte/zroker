import { Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Version } from "../../wailsjs/go/main/App";

const Page = () => {
  const [version, setVersion] = useState("");

  const getVersion = async () => {
    const _version = await Version();
    setVersion(_version.slice(-20));
  };
  useEffect(() => {
    getVersion();
  }, []);
  return (
    <Flex className="w-full m-3">
      <Card
        variant="ghost"
        className="w-full
    [background-color:#3c2693] [background-image:linear-gradient(180deg,#0e0238_0,#231069_100%)]"
      >
        <Text
          size="9"
          className="text-white"
        >
          Version: {version}
        </Text>
        <img
          width={400}
          src="https://zrok.io/wp-content/uploads/2023/01/space3-1327x1536.png.webp"
        />
      </Card>
    </Flex>
  );
};

export default Page;
