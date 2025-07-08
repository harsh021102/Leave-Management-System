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
} from "@mui/material";
import AddHoliday from "../components/AddHoliday";

const holidayData = {
	2023: [
		{ name: "New Year", date: "2023-01-01", type: "Public Holiday" },
		{ name: "Diwali", date: "2023-11-12", type: "Festival" },
	],
	2024: [
		{ name: "Republic Day", date: "2024-01-26", type: "Public Holiday" },
		{ name: "Holi", date: "2024-03-25", type: "Festival" },
	],
	2025: Array(15).fill({
		name: "Christmas",
		date: "2025-12-25",
		type: "Festival",
	}),
};

const HolidayTable = () => {
	const currentYear = new Date().getFullYear();
	const [selectedYear, setSelectedYear] = useState(currentYear);

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
	};

	return (
		<Box
			style={{
				padding: 20,
				width: "98.5%",
				height: "100%",
				backgroundColor: "background.white",
			}}
		>
			<Typography variant="h5" gutterBottom>
				Holiday List - {selectedYear}
			</Typography>
			<AddHoliday />
			<FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
				<InputLabel id="year-select-label">Year</InputLabel>
				<Select
					labelId="year-select-label"
					id="year-select"
					value={selectedYear}
					label="Year"
					onChange={handleYearChange}
				>
					{Object.keys(holidayData).map((year) => (
						<MenuItem key={year} value={parseInt(year)}>
							{year}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<TableContainer
				component={Paper}
				sx={{
					height: "calc(100vh - 220px)", // Adjust 200px based on your header/dropdown height
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
								}}
							>
								<strong>Holiday Type</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(holidayData[selectedYear] || []).map((holiday, index) => (
							<TableRow key={index}>
								<TableCell>{holiday.name}</TableCell>
								<TableCell>{holiday.date}</TableCell>
								<TableCell>{holiday.type}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default HolidayTable;
