import { Box, Container, Typography } from "@mui/material";
import React from "react";
import KPI from "../components/KPI";
import MyLeaves from "../components/MyLeaves";
import "../styles/Dashboard.css"; // Assuming you have a CSS file for styles
import { useState } from "react";
import ApplyLeave from "../components/ApplyLeave";
import { useMain } from "../context/MainContext";
import HolidayTable from "./HolidayTable";
const Dashboard = () => {
	const { applyLeaveMenu } = useMain();
	return (
		<Box
			className="dashboard-container"
			sx={{ backgroundColor: "background.white" }}
		>
			{applyLeaveMenu && <ApplyLeave />}
			<KPI />
			<MyLeaves />
			{/* <HolidayTable /> */}
		</Box>
	);
};

export default Dashboard;
