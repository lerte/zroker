import { Card } from "@radix-ui/themes";
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
    <Card className="w-full flex flex-col gap-2 p-8">Version: {version}</Card>
  );
};

export default Page;
