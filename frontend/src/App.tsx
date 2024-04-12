import router from "./router";
import { useEffect, useState } from "react";
import { isDark } from "./utils";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useAutoDark } from "./hooks/useAutoDark";
import { Theme, ThemePanel } from "@radix-ui/themes";

const App = () => {
  const [theme] = useAutoDark();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDark);
  }, []);

  return (
    <Theme
      scaling="95%"
      radius="large"
      grayColor="sand"
      appearance={theme}
      accentColor="crimson"
    >
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: dark ? "#333" : "#fff",
            color: dark ? "#fff" : "#000",
          },
        }}
      />
      <ThemePanel />
    </Theme>
  );
};

export default App;
