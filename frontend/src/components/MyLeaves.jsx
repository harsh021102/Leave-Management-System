import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useMain } from "../context/MainContext";

import axios from "axios";

function createData(id, startDate, endDate, leaveType, noOfDays, status) {
	return {
		id,
		startDate,
		endDate,
		leaveType,
		noOfDays,
		status,
	};
}

// const rows = [
// 	createData(1, "10 Mar 2025", "15 Mar 2025", "Annual Leave", 1, "Approved"),
// 	createData(2, "11 Jan 2025", "1 Jan 2025", "Annual Leave", 1, "Approved"),
// 	createData(3, "12 Feb 2025", "2 Feb 2025", "Sick Leave", 1, "Approved"),
// 	createData(4, "13 Mar 2025", "3 Mar 2025", "Annual Leave", 1, "Approved"),
// 	createData(5, "14 Apr 2025", "4 Apr 2025", "Casual Leave", 1, "Rejected"),
// ];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
	// {
	// 	id: "id",
	// 	numeric: true,
	// 	label: "ID",
	// },
	{
		id: "startDate",
		numeric: false,
		label: "Start Date",
	},
	{
		id: "endDate",
		numeric: false,
		label: "End Date",
	},
	{
		id: "leaveType",
		numeric: false,
		label: "Leave Type",
	},
	{
		id: "noOfDays",
		numeric: true,
		label: "No. of Days",
	},
	{
		id: "status",
		numeric: false,
		label: "Status",
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead sx={{ backgroundColor: "white" }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						padding="none"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell align="center" sx={{ paddingLeft: 1, paddingRight: 0 }}>
					<TableSortLabel>Actions</TableSortLabel>
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};
const BASE_API = process.env.BASE_URL || "http://localhost:5000/api/v1";
export default function MyLeaves() {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState([]);
	const [reload, setReload] = React.useState(false);
	const { applyLeaveMenu, setApplyLeaveMenu } = useMain();
	const fetchAllLeaves = async () => {
		try {
			const response = await axios.get(`${BASE_API}/leaves`);
			const data = response.data;
			setRows(data.allLeaves);
			setReload((prev) => prev);
			console.log("Fetched leaves:", data.allLeaves);
		} catch (error) {
			console.error("Error fetching leaves:", error);
		}
	};
	React.useEffect(() => {
		fetchAllLeaves();
	}, [reload]);
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			[...rows]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[rows, order, orderBy, page, rowsPerPage]
	);

	return (
		<Box sx={{ width: "100%", padding: 2 }}>
			<Box
				style={{
					// padding: 20,
					width: "98.5%",
					backgroundColor: "background.white",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{/* <CustomAlert status={open} /> */}
				<Typography variant="h5" gutterBottom>
					Apply Leave
				</Typography>
				<Button
					variant="contained"
					onClick={() => {
						setApplyLeaveMenu(true);
					}}
					sx={{ height: "100%" }}
				>
					Add Employee
				</Button>
			</Box>

			<Paper
				sx={{ width: "98.5%", padding: "0 10px", margin: "10px 0px" }}
				elevation={2}
			>
				<Paper sx={{ width: "100%", mb: 2 }} elevation={0}>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
							size="medium"
						>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
							/>
							<TableBody>
								{visibleRows.map((row, index) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
											<TableCell align="center">
												{new Date(row.startDate).toLocaleDateString("en-IN")}
											</TableCell>
											<TableCell align="center">
												{new Date(row.endDate).toLocaleDateString("en-IN")}
											</TableCell>
											<TableCell align="center">{row.leaveType}</TableCell>
											<TableCell align="center">{row.numOfDays}</TableCell>
											<TableCell
												align="center"
												sx={{ display: "flex", justifyContent: "center" }}
											>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														gap: 1,
														backgroundColor:
															row.leaveStatus === "Approved"
																? "lightgreen"
																: row.leaveStatus === "Pending"
																	? "pending.lightyellow"
																	: "lightred",
														borderRadius: 5,
														width: "fit-content",
														padding: "2px 8px",
													}}
												>
													<Box
														sx={{
															width: 12,
															height: 12,
															borderRadius: 50,

															backgroundColor:
																row.leaveStatus === "Approved"
																	? "green"
																	: row.leaveStatus === "Pending"
																		? "yellow"
																		: "red",
														}}
													></Box>
													<Typography>{row.leaveStatus}</Typography>
												</Box>
											</TableCell>
											<TableCell align="center">
												<Box
													sx={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														// backgroundColor: "pink",
													}}
												>
													<IconButton sx={{ padding: 0 }}>
														<EditIcon color="primary" />
													</IconButton>
												</Box>
											</TableCell>
										</TableRow>
									);
								})}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height: 53 * emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Paper>
		</Box>
	);
}
