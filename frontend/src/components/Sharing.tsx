import {
  Button,
  Card,
  Flex,
  IconButton,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ChooseFolder, Sharing } from "../../wailsjs/go/main/App";
import { Ellipsis, Folder } from "lucide-react";

import { useState } from "react";

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
  const [folder, setFolder] = useState(""); // for driver backend mode
  // share mode
  const [shareMode, setShareMode] = useState(ShareMode.PublicShareMode);
  // backend mode
  const [backendMode, setBackendMode] = useState<BackendMode>(
    BackendMode.ProxyBackendMode
  );

  const handleSelectFolder = async () => {
    const path = await ChooseFolder();
    setFolder(path);
  };

  const handleSharing = async () => {
    setLoading(true);

    let options = null;
    if (backendMode == BackendMode.DriveBackendMode) {
      options = {
        ShareMode: shareMode,
        BackendMode: backendMode,
        Target: folder,
      };
    } else {
      options = {
        ShareMode: shareMode,
        BackendMode: backendMode,
        Target: `http://${hostname}:${hostport}`,
      };
    }

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
          value={backendMode}
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

        {backendMode == BackendMode.DriveBackendMode ? (
          <>
            <TextField.Root
              size="3"
              value={folder}
              className="w-full"
              placeholder="Select Folder"
              onChange={(e) => setFolder(e.target.value)}
            >
              <TextField.Slot>
                <Folder />
              </TextField.Slot>
              <TextField.Slot>
                <IconButton onClick={handleSelectFolder}>
                  <Ellipsis />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          </>
        ) : (
          <>
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
                <label htmlFor="hostport">Hostport</label>
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
          </>
        )}
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
