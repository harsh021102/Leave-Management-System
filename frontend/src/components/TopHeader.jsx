import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import "../styles/TopHeader.css"; // Assuming you have a CSS file for styles
// import logo from "../assets/logo.png"; // Adjust the path to your logo image
import MenuIcon from "@mui/icons-material/Menu";
import anu from "../assets/anu.png"; // Adjust the path to your profile image
import { useMain } from "../context/MainContext";
import CloseIcon from "@mui/icons-material/Close";
const TopHeader = () => {
	const { openDrawer, setOpenDrawer } = useMain();
	return (
		<Paper
			className="header-container"
			sx={{
				backgroundColor: "primary.main",
				borderRadius: 0,
				width: "100%",
			}}
		>
			<Box className="image-menu-container">
				<IconButton
					onClick={() => setOpenDrawer(!openDrawer)}
					sx={{
						color: "white",
						transition: "color 0.3s ease",
					}}
				>
					{openDrawer ? (
						<CloseIcon className="menu-icon" />
					) : (
						<MenuIcon className="menu-icon" />
					)}
				</IconButton>
				{/* <img src={logo} alt="company-logo" /> */}
				<Typography variant="h6" className="logo-text">
					LeaveTrack
				</Typography>
			</Box>

			<Box className="profile-container">
				<Avatar alt="profile-image" src={anu} />
			</Box>
		</Paper>
	);
};

export default TopHeader;
