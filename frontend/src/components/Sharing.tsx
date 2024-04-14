import { useState } from "react";
import { Sharing } from "../../wailsjs/go/main/App";
import { Flex, Card, Text, TextField, Button, Select } from "@radix-ui/themes";

enum BackendMode {
  WebBackendMode = "web",
  ProxyBackendMode = "proxy",
  CaddyBackendMode = "caddy",
  DriveBackendMode = "drive",
  TcpTunnelBackendMode = "tcpTunnel",
  UdpTunnelBackendMode = "udpTunnel",
}

enum ShareMode {
  PublicShareMode = "public",
  PrivateShareMode = "private",
}

export default ({ onFinished }: { onFinished: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [hostport, setHostport] = useState("5173");
  const [hostname, setHostname] = useState("localhost");
  // share mode
  const [shareMode, setShareMode] = useState(ShareMode.PublicShareMode);
  // backend mode
  const [backendMode, setBackendMode] = useState<BackendMode>(
    BackendMode.ProxyBackendMode
  );

  const handleSharing = async () => {
    setLoading(true);

    const options = {
      ShareMode: shareMode,
      BackendMode: backendMode,
      Target: `http://${hostname}:${hostport}`,
    };

    const share = await Sharing(options);
    if (share.token) {
      setLoading(false);
      onFinished();
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
        <Select.Root
          size="3"
          value={shareMode}
          onValueChange={setShareMode as (value: ShareMode) => void}
        >
          <Select.Trigger className="!w-full" />
          <Select.Content position="popper">
            <Select.Group>
              <Select.Label>shareMode</Select.Label>

              {Object.entries(ShareMode).map(([key, value]) => (
                <Select.Item
                  key={key}
                  value={value}
                >
                  {value}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Select.Root
          size="3"
          value={BackendMode.ProxyBackendMode}
          onValueChange={setBackendMode as (value: BackendMode) => void}
        >
          <Select.Trigger className="!w-full" />
          <Select.Content position="popper">
            <Select.Group>
              <Select.Label>backendMode</Select.Label>

              {Object.entries(BackendMode).map(([key, value]) => (
                <Select.Item
                  key={key}
                  value={value}
                >
                  {value}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Flex
          gap="4"
          align="center"
          className="w-full"
        >
          <Text>
            <label htmlFor="hostname">Hostname</label>
          </Text>
          <TextField.Root
            size="3"
            id="hostname"
            value={hostname}
            className="w-full"
            placeholder="Input hostname"
            onChange={(e) => setHostname(e.target.value)}
          />
        </Flex>

        <Flex
          gap="4"
          align="center"
          className="w-full"
        >
          <Text>
            <label htmlFor="hostport">Hostname</label>
          </Text>
          <TextField.Root
            size="3"
            id="hostport"
            value={hostport}
            className="w-full"
            placeholder="Input hostport"
            onChange={(e) => setHostport(e.target.value)}
          />
        </Flex>
        <Button
          color="blue"
          loading={loading}
          onClick={handleSharing}
          className="!block !w-full"
        >
          Start Sharing
        </Button>
      </Flex>
    </Card>
  );
};
