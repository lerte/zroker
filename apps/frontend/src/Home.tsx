import { useState } from "react";
import { Share, Environment } from "./../types/zrok";
import toast from "react-hot-toast";
import { Button, TextField } from "@radix-ui/themes";
import {
  Zrok,
  Invite,
  Version,
  Overview,
} from "../../../frontend/wailsjs/go/main/App";

function Home() {
  const [email, setEmail] = useState("");
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    const result = await Invite(email);
    const [statusCode, ...statusText] = result.split(" ");

    if (statusCode == "201") {
      toast.success("Invite sent to " + email);
    } else {
      toast.error(statusText.join(" "));
    }
  };

  const handleEnable = async () => {
    setLoading(true);
    const commands = command.split(" ").filter((item) => item != "");
    commands.shift();
    const result = await Zrok(commands);
    if (/^\[ERROR\]/.test(result)) {
      toast.error(result);
    }
    if (/successfully/.test(result)) {
      toast.success("the zrok environment was successfully enabled...");
    }
    setLoading(false);
  };

  const handleSharing = async () => {
    setLoading(true);
    const commands = command.split(" ").filter((item) => item != "");
    commands.shift();
    Zrok(commands);
    setInterval(() => {
      getOverview();
    }, 2000);
  };

  const getVersion = async () => {
    const version = await Version();
    toast.success("Version: " + version.slice(-20));
  };

  type Environments = {
    environment: Environment[];
    shares?: Share[];
  };
  const getOverview = async () => {
    const overview = await Overview();
    const { environments }: { environments: Environments[] } =
      JSON.parse(overview);

    console.info(environments);
    const index = environments.findIndex((environment) =>
      environment.shares?.filter(
        (share) => share.backendProxyEndpoint == "http://localhost:300"
      )
    );
    if (index > -1) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="flex gap-4 w-full">
        <TextField.Root
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField.Root>
        <Button
          color="lime"
          onClick={handleInvite}
        >
          Zrok Invite
        </Button>
      </div>

      <h2>Enable your zrok account</h2>
      <div className="flex gap-4 w-full">
        <TextField.Root
          placeholder="Enable your zrok account"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        ></TextField.Root>
        <Button
          color="blue"
          loading={loading}
          onClick={handleEnable}
        >
          Enable
        </Button>
      </div>

      <h2>Sharing</h2>
      <div className="flex gap-4 w-full">
        <TextField.Root
          placeholder="Sharing"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        ></TextField.Root>
        <Button
          color="red"
          loading={loading}
          onClick={handleSharing}
        >
          Sharing
        </Button>
      </div>

      <Button
        color="purple"
        onClick={getOverview}
      >
        getOverview
      </Button>

      <Button
        color="blue"
        onClick={getVersion}
      >
        获取版本号
      </Button>
    </div>
  );
}

export default Home;
