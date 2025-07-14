import React, { useEffect } from 'react';
import Dashboard from './screens/Dashboard';
import './styles/App.css'
import { Box, Typography } from '@mui/material';
import TopHeader from './components/TopHeader';
import LeftNav from './components/LeftNav';
import { useState } from 'react';

import { Route, Routes, useParams } from 'react-router';
import HolidayTable from './screens/HolidayTable';
import { useMain } from './context/MainContext';
import Approvals from './screens/Approvals';
import Admin from './screens/Admin';

function App() {

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
          <Route path="/admin" element={<Admin />} />
        {/* <Dashboard /> */}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
