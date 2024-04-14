import dayjs from "dayjs";
import Sharing from "./Sharing";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { XCircle, CopyIcon, Plus, Delete, RefreshCw } from "lucide-react";
import { Share, Environment } from "../../types/zrok";
import { Overview, OpenExternal, DeleteShare } from "../../wailsjs/go/main/App";
import {
  Box,
  Flex,
  Text,
  Link,
  Table,
  Badge,
  Button,
  Dialog,
  ScrollArea,
  Separator,
  Card,
} from "@radix-ui/themes";

type Environments = {
  environment: Environment[];
  shares?: Share[];
};

const Page = () => {
  // 当前的Share
  const [current, setCurrent] = useState<Partial<Share>>({} as Share);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [shares, setShares] = useState<Share[]>([]);
  const [environments, setEnvironments] = useState<Environments[]>([]);

  const getOverview = async () => {
    setLoading(true);
    const overview = await Overview();

    const { environments }: { environments: Environments[] } =
      JSON.parse(overview);
    setEnvironments(environments);
    setLoading(false);
  };

  useEffect(() => {
    getOverview();
  }, []);

  useEffect(() => {
    if (!loading) {
      setShares(environments[0]?.shares?.reverse() ?? []);
    }
  }, [loading]);

  const handleClickFrontendEndpoint = (url: string) => {
    if (url == "private") {
      return;
    }
    OpenExternal(url);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    share: Partial<Share>
  ) => {
    event.stopPropagation();
    setCurrent(share);
    setIsLoading(true);
    const ok = await DeleteShare({
      token: share.token!,
      frontend_endpoints: [],
    });

    if (ok) {
      toast.success("删除成功");
      setShares([...shares.filter((item) => item.token != share.token)]);
    } else {
      toast.error("删除失败");
    }
    setIsLoading(false);
    setCurrent({} as Share);
  };

  const [shareDialog, setShareDialog] = useState(false);
  const openSharing = () => {
    setShareDialog(true);
  };
  const handleFinished = async () => {
    await getOverview();
    setShareDialog(false);
  };

  const [detailDialog, setDetailDialog] = useState(false);
  const openDetail = (share: Share) => {
    setCurrent(share);
    setDetailDialog(true);
  };

  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      className="h-full rounded-xl border-2 border-[rgb(229,231,235)] dark:border-[#535353]"
    >
      <Box className="absolute left-4 top-4 !flex gap-4">
        <Button
          size="4"
          variant="solid"
          loading={loading}
          onClick={getOverview}
        >
          <RefreshCw /> Refresh
        </Button>

        <Dialog.Root
          open={shareDialog}
          onOpenChange={setShareDialog}
        >
          <Dialog.Trigger>
            <Button
              size="4"
              color="cyan"
              variant="solid"
              onClick={openSharing}
            >
              <Plus /> Sharing
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title className="flex justify-between">
              <Text>Sharing</Text>
              <Dialog.Close className="cursor-pointer">
                <XCircle size={36} />
              </Dialog.Close>
            </Dialog.Title>
            <Sharing onFinished={handleFinished} />
          </Dialog.Content>
        </Dialog.Root>
      </Box>

      <Flex
        gap="5"
        className="mt-20"
        direction="column"
      >
        <Separator
          size="4"
          orientation="horizontal"
        />
        <Table.Root size="3">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>backendMode</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                backendProxyEndpoint
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>frontendEndpoint</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>shareMode</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>createdAt</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="py-4">
            {shares.map((share, index) => (
              <Table.Row
                key={index}
                className="cursor-pointer hover:bg-gray-500/20 hover:text-white"
                onClick={() => openDetail(share)}
              >
                <Table.RowHeaderCell>
                  <Badge
                    size="3"
                    color="jade"
                    radius="full"
                    variant="soft"
                  >
                    {share.backendMode}
                  </Badge>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Badge
                    size="3"
                    color="cyan"
                    radius="full"
                    variant="soft"
                  >
                    {share.shareMode}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    href="#"
                    onClick={() => OpenExternal(share.backendProxyEndpoint)}
                  >
                    {share.backendProxyEndpoint}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {share.frontendEndpoint == "private" ? (
                    <Text>{share.frontendEndpoint}</Text>
                  ) : (
                    <Link
                      href="#"
                      onClick={() =>
                        handleClickFrontendEndpoint(share.frontendEndpoint)
                      }
                    >
                      {share.frontendEndpoint}
                    </Link>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(share.createdAt).format("YYYY/M/DD HH:mm:ss")}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="solid"
                    onClick={(event) => handleDelete(event, share)}
                    loading={current.token == share.token && isLoading}
                  >
                    <Delete /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>

      <Dialog.Root
        open={detailDialog}
        onOpenChange={setDetailDialog}
      >
        <Dialog.Content>
          <Dialog.Close>
            <Flex
              justify="end"
              className="mb-5"
            >
              <XCircle
                size={36}
                className="cursor-pointer"
              />
            </Flex>
          </Dialog.Close>
          <Card className="space-y-5">
            <Flex gap="5">
              <Text
                size="5"
                className="basis-1/5"
              >
                token
              </Text>
              <Text
                size="5"
                className="basis-3/5"
              >
                {current.token}
              </Text>
              <CopyIcon className="cursor-pointer" />
            </Flex>
            <Flex gap="5">
              <Text
                size="5"
                className="basis-1/5"
              >
                zId
              </Text>
              <Text
                size="5"
                className="basis-3/5"
              >
                {current.zId}
              </Text>
              <CopyIcon className="cursor-pointer" />
            </Flex>
            <Flex gap="5">
              <Text
                size="5"
                className="basis-1/5"
              >
                updatedAt
              </Text>
              <Text
                size="5"
                className="basis-3/5"
              >
                {dayjs(current.updatedAt).format("YYYY/M/DD HH:mm:ss")}
              </Text>
            </Flex>
          </Card>
        </Dialog.Content>
      </Dialog.Root>
    </ScrollArea>
  );
};

export default Page;
