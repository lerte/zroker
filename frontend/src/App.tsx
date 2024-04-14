import Zroker from "./Zroker";
import { isDark } from "./utils";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { EnableProvider } from "./contexts/Enable";
import { useAutoDark } from "./hooks/useAutoDark";

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
      <EnableProvider>
        <Zroker />
      </EnableProvider>
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
    </Theme>
  );
};

export default App;
