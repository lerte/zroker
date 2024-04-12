import { useState } from "react";
import toast from "react-hot-toast";
import { Zrok } from "../../wailsjs/go/main/App";
import { Card, TextField, Button } from "@radix-ui/themes";

const Page = () => {
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <Card className="w-full flex flex-col gap-2 p-8">
      <h2>Enable your zrok account</h2>
      <div className="flex gap-4 w-full">
        <TextField.Root
          value={command}
          placeholder="Enable your zrok account"
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button
          color="blue"
          loading={loading}
          onClick={handleEnable}
        >
          Enable
        </Button>
      </div>
    </Card>
  );
};

export default Page;
