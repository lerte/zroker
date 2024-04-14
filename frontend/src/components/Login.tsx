import Invite from "./Invite";
import Enable from "./Enable";
import { Box, Card, Flex, Tabs } from "@radix-ui/themes";

const Login = () => {
  return (
    <Card className="w-full">
      <Flex
        gap="6"
        align="center"
        justify="center"
        direction="column"
        className="h-full w-full mx-auto"
      >
        <Tabs.Root
          defaultValue="invite"
          className="w-[480px] md:w-[600px]"
        >
          <Tabs.List>
            <Tabs.Trigger value="invite">Invite</Tabs.Trigger>
            <Tabs.Trigger value="enable">Enable</Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value="invite">
              <Invite />
            </Tabs.Content>

            <Tabs.Content value="enable">
              <Enable />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Card>
  );
};

export default Login;
