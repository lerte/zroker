import { useState } from "react";
import { Info } from "lucide-react";
import toast from "react-hot-toast";
import { useEnable } from "../contexts/Enable";
import { Enable } from "../../wailsjs/go/main/App";
import { OpenExternal } from "../../wailsjs/go/main/App";
import { Card, Tooltip, Flex, Text, TextField, Button } from "@radix-ui/themes";

const EnablePage = () => {
  const { setEnable } = useEnable();
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnable = async () => {
    setLoading(true);
    const commands = command.split(" ").filter((item) => item != "");
    const token = commands.pop();
    if (!token) {
      toast.error("Invalid command");
    } else {
      const ok = await Enable(token);
      if (ok) {
        toast.success("Enabled successfully");
        setEnable(true);
      } else {
        toast.error("Enable failed");
      }
    }
    setLoading(false);
  };

  return (
    <Card className="w-full">
      <Flex
        gap="6"
        align="center"
        justify="center"
        direction="column"
        className="h-full max-w-sm mx-auto"
      >
        <Text size="6">Enable your zrok account</Text>

        <TextField.Root
          size="3"
          value={command}
          className="w-full"
          placeholder="Enable your zrok account"
          onChange={(e) => setCommand(e.target.value)}
        >
          <TextField.Slot>
            <Tooltip content="Copy Enable Your Environment from https://api.zrok.io/">
              <Info
                className="cursor-pointer"
                onClick={() => OpenExternal("https://api.zrok.io/")}
              />
            </Tooltip>
          </TextField.Slot>
        </TextField.Root>
        <Button
          size="3"
          color="blue"
          loading={loading}
          onClick={handleEnable}
          className="!block !w-full"
        >
          Enable
        </Button>
      </Flex>
    </Card>
  );
};

export default EnablePage;
