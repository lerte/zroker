import router from "./router";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { useAutoDark } from "./../hooks/useAutoDark";

const App = () => {
  const [theme] = useAutoDark();
  return (
    <Theme
      scaling="95%"
      radius="large"
      grayColor="sand"
      appearance={theme}
      accentColor="crimson"
    >
      <RouterProvider router={router} />
      <Toaster />
      <ThemePanel />
    </Theme>
  );
};

export default App;
