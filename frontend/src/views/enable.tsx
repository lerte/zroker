import { useState } from "react";
import { Info } from "lucide-react";
import toast from "react-hot-toast";
import { Zrok, OpenExternal } from "../../wailsjs/go/main/App";
import { Card, Tooltip, Flex, Text, TextField, Button } from "@radix-ui/themes";

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
          className="!block !w-full"
          loading={loading}
          onClick={handleEnable}
        >
          Enable
        </Button>
      </Flex>
    </Card>
  );
};

export default Page;
