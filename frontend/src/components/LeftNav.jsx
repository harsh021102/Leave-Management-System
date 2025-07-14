import { Box, Button, List, ListItem, Paper } from "@mui/material";
import React from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FaScaleBalanced } from "react-icons/fa6";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ApprovalIcon from "@mui/icons-material/Approval";
import SettingsIcon from "@mui/icons-material/Settings";
import "../styles/LeftNav.css"; // Assuming you have a CSS file for styles
import { useMain } from "../context/MainContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// const drawerWidth = 200;
const drawerMenuItems = [
	{
		id: 1,
		label: "Dashboard",
		icon: <SpaceDashboardIcon className="nav-icon" />,
	},
	{
		id: 2,
		label: "Holidays",
		icon: <CalendarMonthIcon className="nav-icon" />,
	},

	{ id: 3, label: "Approvals", icon: <ApprovalIcon className="nav-icon" /> },
	{
		id: 4,
		label: "Admin",
		icon: <AdminPanelSettingsIcon className="nav-icon" />,
	},
];
const LeftNav = () => {
	const navigate = useNavigate();
	const { openDrawer, currScr, setCurrScr } = useMain();
	return (
		<Paper
			elevation={3}
			square={false}
			className="left-nav-wrapper"
			sx={{
				width: openDrawer ? 200 : 0,
				display: openDrawer ? "flex" : "none",
				transition: "display 0.3s ease",
				borderRadius: 0,
				boxShadow: 3,
			}}
		>
			<List className="left-nav-container">
				{drawerMenuItems.map((item) => {
					return (
						<ListItem
							// button
							key={item.id}
							className="nav-item"
							sx={{
								backgroundColor:
									currScr === item.label ? "primary.main" : "background.white",
								color:
									currScr === item.label ? "background.white" : "primary.main",
								"&:hover": {
									backgroundColor: "primary.light",
									color: "background.white",
								},
							}}
							onClick={() => {
								if (item.label === "Dashboard") {
									navigate("/");
									setCurrScr("Dashboard");
								} else if (item.label === "Holidays") {
									navigate("/holidays");
									setCurrScr("Holidays");
								} else if (item.label === "Approvals") {
									navigate("/approvals");
									setCurrScr("Approvals");
								} else if (item.label === "Admin") {
									navigate("/admin");
									setCurrScr("Admin");
								}
							}}
						>
							{item.icon}
							<span sx={{ color: "primary.main" }}>{item.label}</span>
						</ListItem>
					);
				})}
			</List>
		</Paper>
	);
};

export default LeftNav;
