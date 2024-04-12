import { useState } from "react";
import toast from "react-hot-toast";
import { Card, TextField, Button } from "@radix-ui/themes";
import { Invite } from "../../wailsjs/go/main/App";

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
    <Card className="w-full flex flex-col gap-2 p-8">
      <div className="flex gap-4 w-full">
        <TextField.Root
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          color="lime"
          loading={loading}
          onClick={handleInvite}
        >
          Zrok Invite
        </Button>
      </div>
    </Card>
  );
};

export default Page;
