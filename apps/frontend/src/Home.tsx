import { useState } from "react";
import { Invite, Zrok } from "./../wailsjs/go/main/App";
import { Input, Button, useToast } from "@chakra-ui/react";

function Home() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [command, setCommand] = useState("");

  const handleInvite = async () => {
    const result = await Invite(email);
    const [statusCode, ...statusText] = result.split(" ");

    if (statusCode == "201") {
      toast({
        title: "Invited",
        description: "Invite sent to " + email,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Result",
        description: statusText.join(" "),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEnable = async () => {
    const commands = command.split(" ").filter((item) => item != "");
    commands.shift();
    const result = await Zrok(commands);
    if (/^\[ERROR\]/.test(result)) {
      toast({
        title: "Error",
        description: result,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getVersion = async () => {
    const version = await Zrok(["version"]);
    toast({
      title: "Version",
      description: version.slice(-20),
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="flex gap-4 w-full">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          colorScheme="green"
          onClick={handleInvite}
        >
          Zrok Invite
        </Button>
      </div>

      <h2>Enable your zrok account</h2>
      <div className="flex gap-4 w-full">
        <Input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button
          colorScheme="red"
          onClick={handleEnable}
        >
          Enable
        </Button>
      </div>

      <Button
        colorScheme="blue"
        onClick={getVersion}
      >
        获取版本号
      </Button>
    </div>
  );
}

export default Home;
