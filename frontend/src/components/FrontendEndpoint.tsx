import { useState } from "react";
import { Share } from "../../types/zrok";
import { Text, Link, Tooltip } from "@radix-ui/themes";
import { OpenExternal, Request } from "../../wailsjs/go/main/App";

const FrontendEndpoint = ({ share }: { share: Share }) => {
  const [active, setActive] = useState(false);
  const openExternal = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string
  ) => {
    event.stopPropagation();
    if (url == "private") {
      return;
    }
    OpenExternal(url);
  };

  const getStatus = async () => {
    const statusCode = await Request(share.frontendEndpoint);
    if (statusCode == 404) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  getStatus();

  return (
    <Link
      href="#"
      onClick={(event) => openExternal(event, share.frontendEndpoint)}
    >
      <span
        className={`inline-block mr-2 size-3 rounded-full shadow-inner ${
          active ? "border-green-900 bg-green-500" : "border-red-900 bg-red-500"
        }`}
      ></span>
      <Tooltip content={share.frontendEndpoint}>
        <Text>{share.frontendEndpoint.slice(0, 20)}</Text>
      </Tooltip>
    </Link>
  );
};

export default FrontendEndpoint;
