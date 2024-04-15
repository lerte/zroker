import Login from "./components/Login";
import { Sun, Moon } from "lucide-react";
import Overview from "./components/Overview";
import { useEnable } from "./contexts/Enable";
import { Theme } from "./hooks/useAutoDark";
import { Box, Button, Flex } from "@radix-ui/themes";

const Zroker = ({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) => {
  const { enable } = useEnable();

  return (
    <Flex className="h-dvh p-4">
      {enable ? <Overview /> : <Login />}
      <Box className="absolute right-12 top-12 !flex gap-4">
        <Button
          size="4"
          radius="full"
          variant="ghost"
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        >
          {theme == "dark" ? <Moon /> : <Sun />}
        </Button>
      </Box>
    </Flex>
  );
};
export default Zroker;
