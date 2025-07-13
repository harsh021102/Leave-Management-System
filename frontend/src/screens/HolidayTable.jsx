import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Typography,
	Box,
	IconButton,
	Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddHoliday from "../components/AddHoliday";
import { useEffect } from "react";
import axios from "axios";
import HolidayDataUpdate from "../components/AddHoliday";
import EditHoliday from "../components/EditHoliday";
import CustomAlert from "../components/CustomAlert";
// require("dotenv").config();
// const holidayData = {
// 	2023: [
// 		{ name: "New Year", date: "2023-01-01", type: "Public Holiday" },
// 		{ name: "Diwali", date: "2023-11-12", type: "Festival" },
// 	],
// 	2024: [
// 		{ name: "Republic Day", date: "2024-01-26", type: "Public Holiday" },
// 		{ name: "Holi", date: "2024-03-25", type: "Festival" },
// 	],
// 	2025: Array(15).fill({
// 		name: "Christmas",
// 		date: "2025-12-25",
// 		type: "Festival",
// 	}),
// };
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) =>
	(currentYear - 5 + i).toString()
);

const BASE_API = process.env.BASE_URL || "http://localhost:5000/api/v1";
const HolidayTable = () => {
	const [selectedYear, setSelectedYear] = useState(currentYear.toString());
	const [allHolidayData, setAllHolidayData] = useState([]);
	const [selectedHolidayData, setSelectedHolidayData] = useState(null);
	const [holidayID, setHolidayID] = useState("");
	const [isEditMode, setIsEditMode] = useState(false);
	const [reload, setReload] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertStatus, setAlertStatus] = useState(null);
	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const fetchAllHolidayData = async () => {
		try {
			const response = await axios.get(`${BASE_API}/holidays`);
			const data = response.data.allHolidays; // ✅ Get actual data
			const sorted = data.sort(
				(a, b) => new Date(a.holidayDate) - new Date(b.holidayDate)
			);

			setAllHolidayData(sorted);
		} catch (error) {
			console.error("Error fetching holiday data:", error);
		}
	};
	useEffect(() => {
		fetchAllHolidayData();
	}, [reload]);
	return (
		<>
			{alertOpen && (
				<CustomAlert
					status={alertStatus}
					alertOpen={alertOpen}
					setAlertOpen={setAlertOpen}
				/>
			)}
			<Box
				style={{
					padding: 20,
					width: "98.5%",
					height: "100%",
					backgroundColor: "background.white",
				}}
			>
				{/* <CustomAlert status={open} /> */}
				<Typography variant="h5" gutterBottom>
					Holiday List - {selectedYear}
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						marginBottom: 2,
						height: "50px",
						gap: 2,
					}}
				>
					<Button
						variant="contained"
						onClick={() => {
							handleClickOpen();
							setHolidayID(null);
							setSelectedHolidayData({});
						}}
						sx={{ height: "100%" }}
					>
						Add Holiday
					</Button>
					{isEditMode ? (
						<AddHoliday
							selectedHolidayData={selectedHolidayData}
							holidayID={holidayID}
							setReload={setReload}
							handleClose={handleClose}
							open={open}
							setAlertOpen={setAlertOpen}
							setAlertStatus={setAlertStatus}
						/>
					) : (
						<AddHoliday
							holidayID={holidayID}
							setReload={setReload}
							handleClose={handleClose}
							open={open}
							setAlertOpen={setAlertOpen}
							setAlertStatus={setAlertStatus}
						/>
					)}

					<FormControl sx={{ minWidth: 120 }}>
						<InputLabel id="year-select-label">Year</InputLabel>
						<Select
							labelId="year-select-label"
							id="year-select"
							value={selectedYear}
							label="Year"
							onChange={handleYearChange}
							sx={{ height: "100%" }}
						>
							{years.map((year) => (
								<MenuItem key={year} value={year}>
									{year}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<TableContainer
					component={Paper}
					sx={{
						height: "calc(100vh - 220px)",
						overflowY: "auto",
					}}
				>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										backgroundColor: "#f5f5f5",
										position: "sticky",
										top: 0,
										zIndex: 1,
									}}
								>
									<strong>Holiday Name</strong>
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#f5f5f5",
										position: "sticky",
										top: 0,
										zIndex: 1,
									}}
								>
									<strong>Date</strong>
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#f5f5f5",
										position: "sticky",
										top: 0,
										zIndex: 1,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<strong>Actions</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allHolidayData?.map((holiday, index) => (
								<TableRow key={index}>
									<TableCell>{holiday.holidayName}</TableCell>
									<TableCell>
										{new Date(holiday.holidayDate).toLocaleDateString("en-IN")}
									</TableCell>
									<TableCell>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<IconButton
												sx={{ padding: 0 }}
												onClick={() => {
													setSelectedHolidayData(holiday);
													setHolidayID(holiday._id);
													handleClickOpen();
													setIsEditMode(true);
												}}
											>
												<EditIcon color="primary" />
											</IconButton>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default HolidayTable;
