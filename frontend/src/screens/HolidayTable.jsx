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
import DeleteIcon from "@mui/icons-material/Delete";
import AddHoliday from "../components/AddHoliday";
import { useEffect } from "react";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import DeleteDialog from "../components/DeleteDialog";
import { useMain } from "../context/MainContext";

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
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [alertStatus, setAlertStatus] = useState(null);
	const { setCurrScr } = useMain();
	useEffect(() => {
		setCurrScr("Holidays");
	}, []);
	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleDeleteClose = () => {
		setOpenDeleteDialog(false);
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
			<DeleteDialog
				openDeleteDialog={openDeleteDialog}
				setOpenDeleteDialog={setOpenDeleteDialog}
				handleDeleteClose={handleDeleteClose}
				setReload={setReload}
				holidayID={holidayID}
				type={"holiday"}
				setAlertOpen={setAlertOpen}
				setAlertStatus={setAlertStatus}
			/>
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
										position: "sticky",
										top: 0,
										zIndex: 1,
										backgroundColor: "primary.main",
										color: "white",
									}}
								>
									<strong>Holiday Name</strong>
								</TableCell>
								<TableCell
									sx={{
										position: "sticky",
										top: 0,
										zIndex: 1,
										backgroundColor: "primary.main",
										color: "white",
									}}
								>
									<strong>Date</strong>
								</TableCell>
								<TableCell
									sx={{
										position: "sticky",
										top: 0,
										zIndex: 1,

										backgroundColor: "primary.main",
										color: "white",
									}}
								>
									<strong sx={{ backgroundColor: "pink" }}>Actions</strong>
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
												justifyContent: "start",
												alignItems: "center",
												gap: 3,
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
											<IconButton
												sx={{ padding: 0 }}
												onClick={() => {
													// setSelectedHolidayData(holiday);
													setOpenDeleteDialog(true);
													setHolidayID(holiday._id);
													// handleClickOpen();
													// setIsEditMode(true);
												}}
											>
												<DeleteIcon color="primary" />
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
