import dayjs from "dayjs";
import { Delete, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Share, Environment } from "../../types/zrok";
import { Overview, OpenExternal, UnShare } from "../../wailsjs/go/main/App";
import {
  Box,
  Flex,
  Text,
  Link,
  Table,
  Button,
  Skeleton,
  ScrollArea,
  Separator,
} from "@radix-ui/themes";
import toast from "react-hot-toast";

type Environments = {
  environment: Environment[];
  shares?: Share[];
};

const Page = () => {
  const [loading, setLoading] = useState(true);
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
      setShares(environments[0]?.shares ?? []);
    }
  }, [loading]);

  const handleClickFrontendEndpoint = (url: string) => {
    if (url == "private") {
      return;
    }
    OpenExternal(url);
  };

  const handleDelete = async (share: Share) => {
    const result = await UnShare(share.token);
    toast.success(result);
  };

  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      className="h-full rounded-xl border-2 border-[rgb(229,231,235)] dark:border-[#535353]"
    >
      <Box className="absolute left-4 top-4 flex items-center gap-2">
        <Button
          size="4"
          variant="solid"
          loading={loading}
          onClick={getOverview}
        >
          <RefreshCw /> Refresh
        </Button>
      </Box>
      <Skeleton
        height="100%"
        loading={loading}
      >
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
                <Table.ColumnHeaderCell>
                  frontendEndpoint
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>shareMode</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>token</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>createdAt</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>updatedAt</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>zId</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="py-4">
              {shares.map((share, index) => (
                <Table.Row key={index}>
                  <Table.RowHeaderCell>{share.backendMode}</Table.RowHeaderCell>
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
                  <Table.Cell>{share.shareMode}</Table.Cell>
                  <Table.Cell>{share.token}</Table.Cell>
                  <Table.Cell>
                    {dayjs(share.createdAt).format("YYYY/M/DD HH:mm:ss")}
                  </Table.Cell>
                  <Table.Cell>
                    {dayjs(share.updatedAt).format("YYYY/M/DD HH:mm:ss")}
                  </Table.Cell>
                  <Table.Cell>{share.zId}</Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="solid"
                      loading={loading}
                      onClick={() => handleDelete(share)}
                    >
                      <Delete /> Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Skeleton>
    </ScrollArea>
  );
};

export default Page;
