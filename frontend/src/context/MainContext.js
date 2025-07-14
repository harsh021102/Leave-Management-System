import { createContext, use, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [applyLeaveMenu, setApplyLeaveMenu] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [currScr,setCurrScr] = useState("Dashboard");
  
  return (
    <MainContext.Provider value={{ openDrawer, setOpenDrawer,applyLeaveMenu, setApplyLeaveMenu,currScr,setCurrScr,showEmployeeForm, setShowEmployeeForm }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext); 