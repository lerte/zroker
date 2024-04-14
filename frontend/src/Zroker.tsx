import { Flex } from "@radix-ui/themes";
import Login from "./components/Login";
import Overview from "./components/Overview";
import { useEnable } from "./contexts/Enable";

const Zroker = () => {
  const { enable } = useEnable();

  return (
    <Flex
      gap="4"
      className="h-dvh p-4"
    >
      {enable ? <Overview /> : <Login />}
    </Flex>
  );
};
export default Zroker;
