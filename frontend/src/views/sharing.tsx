import { useState } from "react";
import { Share, Environment } from "../../types/zrok";
import { Zrok, Overview } from "../../wailsjs/go/main/App";
import { Tabs, Flex, Card, Box, TextField, Button } from "@radix-ui/themes";

type Environments = {
  environment: Environment[];
  shares?: Share[];
};

const Sharing = () => {
  const [loading, setLoading] = useState(false);
  const [hostport, setHostport] = useState("5173");
  const [hostname, setHostname] = useState("localhost");
  // sharing type
  const [type, setType] = useState<Share["shareMode"]>("public");

  const handleSharing = async () => {
    setLoading(true);
    Zrok(["share", type, `${hostname}:${hostport}`]);
    setInterval(() => {
      getOverview();
    }, 2000);
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
    <Card className="w-full">
      <Flex
        gap="6"
        align="center"
        justify="center"
        direction="column"
        className="h-full max-w-sm mx-auto"
      >
        <Tabs.Root
          value={type}
          className="w-full"
        >
          <Tabs.List>
            <Tabs.Trigger
              value="public"
              onClick={() => setType("public")}
            >
              Public
            </Tabs.Trigger>
            <Tabs.Trigger
              value="private"
              onClick={() => setType("private")}
            >
              Private
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="public">
              <Flex
                gap="4"
                direction="column"
              >
                <TextField.Root
                  size="3"
                  value={hostname}
                  placeholder="Enable your zrok account"
                  onChange={(e) => setHostname(e.target.value)}
                />
                <TextField.Root
                  size="3"
                  value={hostport}
                  placeholder="Enable your zrok account"
                  onChange={(e) => setHostport(e.target.value)}
                />
                <Button
                  color="blue"
                  loading={loading}
                  onClick={handleSharing}
                >
                  Start Sharing
                </Button>
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="private">
              <Flex
                gap="4"
                direction="column"
              >
                <TextField.Root
                  size="3"
                  value={hostname}
                  placeholder="Enable your zrok account"
                  onChange={(e) => setHostname(e.target.value)}
                />
                <TextField.Root
                  size="3"
                  value={hostport}
                  placeholder="Enable your zrok account"
                  onChange={(e) => setHostport(e.target.value)}
                />
                <Button
                  color="blue"
                  loading={loading}
                  onClick={handleSharing}
                >
                  Start Sharing
                </Button>
              </Flex>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Card>
  );
};

export default Sharing;
