import { useState } from "react";
import toast from "react-hot-toast";
import { Invite } from "../../wailsjs/go/main/App";
import { Card, Flex, Text, TextField, Button } from "@radix-ui/themes";

const Page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    setLoading(true);

    const result = await Invite(email);
    const [statusCode, ...statusText] = result.split(" ");

    if (statusCode == "201") {
      toast.success("Invite sent to " + email);
    } else {
      toast.error(statusText.join(" "));
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
        <Text size="6">Please input email address</Text>
        <TextField.Root
          size="3"
          value={email}
          className="w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          size="3"
          color="lime"
          loading={loading}
          onClick={handleInvite}
          className="!block !w-full"
        >
          Zrok Invite
        </Button>
      </Flex>
    </Card>
  );
};

export default Page;
