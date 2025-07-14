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
import AddUpdateEmployee from "../components/AddUpdateEmployee";

import axios from "axios";
import { useState } from "react";

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
	{
		id: "status",
		numeric: false,
		label: "Status",
	},
	{
		id: "globalId",
		numeric: false,
		label: "Global ID",
	},
	{
		id: "empName",
		numeric: false,
		label: "Employee Name",
	},
	{
		id: "empEmail",
		numeric: false,
		label: "Employee Email",
	},
	{
		id: "gender",
		numeric: true,
		label: "Gender",
	},
	{
		id: "managerName",
		numeric: false,
		label: "Manager Name",
	},
	{
		id: "managerEmail",
		numeric: false,
		label: "Manager Email",
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};
	const { setCurrScr } = useMain();
	React.useEffect(() => {
		setCurrScr("Admin");
	}, [setCurrScr]);

	return (
		<TableHead
			sx={{
				backgroundColor: "primary.main",
				position: "sticky",
				height: 70,
				top: 0,
				zIndex: 2, // Ensure it sits above TableBody content
			}}
		>
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
							sx={{
								color: "white",
								"&:hover": {
									color: "white",
								},
								"&.MuiTableSortLabel-active": {
									color: "white",
								},
							}}
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
				<TableCell
					align="center"
					sx={{ paddingLeft: 1, paddingRight: 0, color: "white" }}
				>
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
export default function Admin() {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState([]);
	const [reload, setReload] = React.useState(false);
	const [employeeId, setEmployeeId] = useState("");
	const { showEmployeeForm, setShowEmployeeForm } = useMain();
	const [open, setOpen] = React.useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	// const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [alertStatus, setAlertStatus] = useState(null);
	const [employeeData, setEmployeeData] = useState(null);
	const fetchAllEmployees = async () => {
		try {
			const response = await axios.get(`${BASE_API}/employees`);
			const data = response.data;
			setRows(data.allEmployees);
			setReload((prev) => prev);
			console.log("Fetched Emp:", data.allEmployees);
		} catch (error) {
			console.error("Error fetching leaves:", error);
		}
	};
	// const fetchEmployeeData = async ()=?
	React.useEffect(() => {
		fetchAllEmployees();
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
		<>
			<AddUpdateEmployee />
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
						Employee List
					</Typography>
					<Button
						variant="contained"
						onClick={() => {
							setShowEmployeeForm(true);
						}}
						sx={{ height: "100%" }}
					>
						Add Employee
					</Button>
				</Box>

				<Paper
					sx={{
						width: "100%",
						// padding: "0 0 0",
						margin: "10px 10px",
						height: "70vh",
						// backgroundColor: "red",
					}}
					elevation={2}
				>
					<Paper sx={{ width: "100%", height: "100%", mb: 2 }} elevation={0}>
						<TableContainer sx={{ height: 450 }}>
							<Table
								sx={{ minWidth: 750, minHeight: 0 }}
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
									// sx={{ backgroundColor: "pink" }}
								/>
								<TableBody sx={{ height: 350 }}>
									{visibleRows.map((row, index) => {
										return (
											<TableRow tabIndex={-1} key={row._id}>
												<TableCell align="center">{row.empStatus}</TableCell>
												<TableCell align="center">{row.globalId}</TableCell>
												<TableCell align="center">{row.empName}</TableCell>
												<TableCell align="center">{row.empEmail}</TableCell>
												<TableCell align="center">{row.gender}</TableCell>
												<TableCell align="center">{row.managerName}</TableCell>
												<TableCell align="center">{row.managerEmail}</TableCell>
												<TableCell align="center">
													<Box
														sx={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															// backgroundColor: "pink",
														}}
													>
														<IconButton
															sx={{ padding: 0 }}
															onClick={() => {
																setEmployeeId(row._id);
															}}
														>
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
							rowsPerPageOptions={[5, 10, 15]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							sx={{ backgroundColor: "white" }}
						/>
					</Paper>
				</Paper>
			</Box>
		</>
	);
}
