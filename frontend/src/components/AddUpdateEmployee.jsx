import React from "react";
import {
	Drawer,
	IconButton,
	Typography,
	Box,
	TextField,
	MenuItem,
	Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMain } from "../context/MainContext";
import axios from "axios";

// Validation schema
const gender = [
	{ type: "male", label: "Male" },
	{ type: "female", label: "Female" },
	{ type: "other", label: "Other" },
];
const validationSchema = Yup.object().shape({
	// startDate: Yup.date().required("Start date is required"),
	// empEmail: Yup.date()
	// 	.required("End date is required")
	// 	.min(Yup.ref("startDate"), "End date can't be before start date"),
	// gender: Yup.string().required("Leave type is required"),
	// reason: Yup.string().required("Reason is required"),
	globalId: Yup.string().required("Global ID is required"),
	empName: Yup.string().required("Employee Name is required"),
	empEmail: Yup.string()
		.required("Employee Email is required")
		.email("Invalid email format"),
	gender: Yup.string().required("Gender is required"),
	annualLeave: Yup.number().required("Annual Leave is required"),
	casualLeave: Yup.number().required("Casual Leave is required"),
	sickLeave: Yup.number().required("Sick Leave is required"),
	managerName: Yup.string().required("Manager Name is required"),
	managerEmail: Yup.string()
		.required("Manager Email is required")
		.email("Invalid email format"),
});
const BASE_API = process.env.BASE_URL || "http://localhost:5000/api/v1";
const LeaveDrawerForm = () => {
	const { showEmployeeForm, setShowEmployeeForm } = useMain();
	const toggleDrawer = (state) => () => {
		setShowEmployeeForm(state);
	};

	return (
		<Drawer
			anchor="right"
			open={showEmployeeForm}
			onClose={toggleDrawer(false)}
		>
			<Box sx={{ width: 400, padding: 3, position: "relative" }}>
				{/* Cancel Icon */}
				<IconButton
					onClick={toggleDrawer(false)}
					sx={{ position: "absolute", top: 8, right: 8 }}
				>
					<CloseIcon />
				</IconButton>

				<Typography variant="h6" gutterBottom>
					Add employee details
				</Typography>

				<Formik
					initialValues={{
						globalId: "",
						empName: "",
						empEmail: "",
						gender: "",
						annualLeave: 12,
						casualLeave: 12,
						sickLeave: 12,
						managerName: "",
						managerEmail: "",
					}}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						try {
							const res = await axios.post(`${BASE_API}/employees`, {
								globalId: "",
								empName: "",
								empEmail: "",
								gender: "",
								annualLeave: 12,
								casualLeave: 12,
								sickLeave: 12,
								managerName: "",
								managerEmail: "",
							});
							toggleDrawer();
							resetForm();
							console.log("✅ Success:", res.data);
						} catch (err) {
							console.error(
								"❌ Axios failed:",
								err.response?.data || err.message
							);
						}
					}}
				>
					{({ values, errors, touched, handleChange }) => {
						return (
							<Form>
								<TextField
									fullWidth
									label="Global ID"
									type="text"
									name="globalId"
									value={values.globalId}
									onChange={handleChange}
									error={touched.globalId && Boolean(errors.globalId)}
									helperText={touched.globalId && errors.globalId}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>
								<TextField
									fullWidth
									label="Employee Name"
									type="text"
									name="empName"
									value={values.empName}
									onChange={handleChange}
									error={touched.empName && Boolean(errors.empName)}
									helperText={touched.empName && errors.empName}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>

								<TextField
									fullWidth
									label="Employee Email"
									type="text"
									name="empEmail"
									value={values.empEmail}
									onChange={handleChange}
									error={touched.empEmail && Boolean(errors.empEmail)}
									helperText={touched.empEmail && errors.empEmail}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>

								<TextField
									fullWidth
									select
									label="Gender"
									name="gender"
									value={values.gender}
									onChange={handleChange}
									defaultValue={"Male"}
									error={touched.gender && Boolean(errors.gender)}
									helperText={touched.gender && errors.gender}
									margin="normal"
								>
									{gender.map((option) => (
										<MenuItem key={option.type} value={option.type}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									fullWidth
									label="Annual Leave"
									type="text"
									name="annualLeave"
									value={values.annualLeave}
									onChange={handleChange}
									error={touched.annualLeave && Boolean(errors.annualLeave)}
									helperText={touched.annualLeave && errors.annualLeave}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>
								<TextField
									fullWidth
									label="Casual Leave"
									type="text"
									name="casualLeave"
									value={values.casualLeave}
									onChange={handleChange}
									error={touched.casualLeave && Boolean(errors.casualLeave)}
									helperText={touched.casualLeave && errors.casualLeave}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>
								<TextField
									fullWidth
									label="Sick Leave"
									type="text"
									name="sickLeave"
									value={values.sickLeave}
									onChange={handleChange}
									error={touched.sickLeave && Boolean(errors.sickLeave)}
									helperText={touched.sickLeave && errors.sickLeave}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>
								<TextField
									fullWidth
									label="Manager Name"
									type="text"
									name="managerName"
									value={values.managerName}
									onChange={handleChange}
									error={touched.managerName && Boolean(errors.managerName)}
									helperText={touched.managerName && errors.managerName}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>

								<TextField
									fullWidth
									label="Manager Email"
									type="text"
									name="managerEmail"
									value={values.managerEmail}
									onChange={handleChange}
									error={touched.managerEmail && Boolean(errors.managerEmail)}
									helperText={touched.managerEmail && errors.managerEmail}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>
								<Button
									fullWidth
									type="submit"
									variant="contained"
									color="primary"
									sx={{ mt: 2 }}
								>
									Submit
								</Button>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</Drawer>
	);
};
export default LeaveDrawerForm;
