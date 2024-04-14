import { IsEnable } from "../../wailsjs/go/main/App";
import { createContext, useContext, useEffect, useState } from "react";

type EnableContextType = {
  enable: boolean;
  setEnable: (enable: boolean) => void;
  getEnable: () => Promise<boolean>;
};

const EnableContext = createContext<EnableContextType>({} as EnableContextType);

export const EnableProvider = ({ children }: { children: React.ReactNode }) => {
  const [enable, setEnable] = useState(false);

  const getEnable = async () => {
    const enable = await IsEnable();
    setEnable(enable);
    return enable;
  };

  useEffect(() => {
    getEnable();
  }, []);

  return (
    <EnableContext.Provider value={{ enable, setEnable, getEnable }}>
      {children}
    </EnableContext.Provider>
  );
};

export const useEnable = () => {
  return useContext(EnableContext);
};
