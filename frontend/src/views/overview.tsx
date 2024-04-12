import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Card, Table } from "@radix-ui/themes";
import { Share, Environment } from "../../types/zrok";
import { Overview } from "../../wailsjs/go/main/App";

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
      setShares(environments[0]?.shares!);
    }
  }, [loading]);

  return (
    <Card className="w-full flex flex-col gap-2 p-8">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Property</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        {shares.map((share, index) => (
          <Table.Body key={index}>
            <Table.Row>
              <Table.RowHeaderCell>backendMode</Table.RowHeaderCell>
              <Table.Cell>{share.backendMode}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>shareMode</Table.RowHeaderCell>
              <Table.Cell>{share.shareMode}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>frontendSelection</Table.RowHeaderCell>
              <Table.Cell>{share.frontendSelection}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>backendProxyEndpoint</Table.RowHeaderCell>
              <Table.Cell>
                <a href={share.backendProxyEndpoint}>
                  {share.backendProxyEndpoint}
                </a>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>frontendEndpoint</Table.RowHeaderCell>
              <Table.Cell>
                <a href={share.frontendEndpoint}>{share.frontendEndpoint}</a>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>createdAt</Table.RowHeaderCell>
              <Table.Cell>
                {dayjs(share.createdAt).format("YYYY/M/DD HH:mm:ss")}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>updatedAt</Table.RowHeaderCell>
              <Table.Cell>
                {dayjs(share.updatedAt).format("YYYY/M/DD HH:mm:ss")}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table.Root>
    </Card>
  );
};

export default Page;
