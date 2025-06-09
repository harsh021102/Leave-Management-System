import { createContext, useContext, useState } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [applyLeaveMenu, setApplyLeaveMenu] = useState(false);
  const [currScr,setCurrScr] = useState("Dashboard");

  return (
    <MainContext.Provider value={{ openDrawer, setOpenDrawer,applyLeaveMenu, setApplyLeaveMenu,currScr,setCurrScr }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext); 