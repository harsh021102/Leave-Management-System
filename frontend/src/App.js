import React, { useEffect } from 'react';
import Dashboard from './screens/Dashboard';
import './styles/App.css'
import { Box, Typography } from '@mui/material';
import TopHeader from './components/TopHeader';
import LeftNav from './components/LeftNav';
import { useState } from 'react';

import { Route, Routes } from 'react-router';
import HolidayTable from './screens/HolidayTable';
import { useMain } from './context/MainContext';
import Approvals from './screens/Approvals';

function App() {
  const {currScr,setCurrScr} =useMain()
  useEffect(() => {
    setCurrScr("Dashboard");
  }
  , []);
  return (
    <Box className="main-container">
      <TopHeader />
      <Box className="content-container" sx={{backgroundColor: "background.white"}}>
        <LeftNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<TestForm />} /> */}
          <Route path="/holidays" element={<HolidayTable />} />
          <Route path="/approvals" element={<Approvals />} />
        {/* <Dashboard /> */}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
