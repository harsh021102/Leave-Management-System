import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import "../styles/KPI.css"; // Assuming you have a CSS file for styles
const kpiData = [
	{ id: 1, count: 12, leaveType: "Annual Leave Balance", bgColor: "red" },
	{ id: 2, count: 4, leaveType: "Sick Leave Balance", bgColor: "blue" },
	{ id: 3, count: 7.5, leaveType: "Casual Leave Balance", bgColor: "green" },
	{ id: 4, count: 9, leaveType: "Maternity Leave Balance", bgColor: "yellow" },
	// { id: 5, count: 5, leaveType: "Paternity Leave Balance", bgColor: "orange" },
];

const KPI = () => {
	return (
		<Box className="kpi-container">
			{kpiData.map((kpi) => (
				<Paper key={kpi.id} className="kpi-card" square={false}>
					<Typography variant="subtitle1" className="kpi-leave-type">
						{kpi.leaveType}
					</Typography>{" "}
					<Box className="gauge-container">
						<Typography
							variant="h5"
							className="kpi-count"
							align="center"
							sx={{ color: "primary.main" }}
						>
							{kpi.count}
							<span className="days-text">days</span>
						</Typography>
						<Gauge
							width={100}
							height={100}
							value={kpi.count}
							valueMin={0}
							valueMax={12}
							sx={{
								"& .MuiGauge-valueArc": {
									fill: "secondary.main", // change to your desired color
								},
								"& .MuiGauge-referenceArc": {
									fill: "#e0e0e0", // background arc color
								},
							}}
						/>
					</Box>
					{/* <Typography
						variant="h5"
						className="kpi-count"
						align="center"
						sx={{ backgroundColor: kpi.bgColor }}
					>
						{kpi.count}
					</Typography>
					<Typography variant="subtitle1" className="kpi-leave-type">
						{kpi.leaveType}
					</Typography> */}
				</Paper>
			))}
		</Box>
	);
};

export default KPI;
