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

// Dummy leave types
const leaveTypes = [
	{ type: "Annual Leave", balance: 12 },
	{ type: "Casual Leave", balance: 12 },
	{ type: "Sick Leave", balance: 12 },
];

// Validation schema
const validationSchema = Yup.object().shape({
	startDate: Yup.date().required("Start date is required"),
	endDate: Yup.date()
		.required("End date is required")
		.min(Yup.ref("startDate"), "End date can't be before start date"),
	leaveType: Yup.string().required("Leave type is required"),
	reason: Yup.string().required("Reason is required"),
});

const LeaveDrawerForm = () => {
	const { applyLeaveMenu, setApplyLeaveMenu } = useMain();
	const toggleDrawer = (state) => () => {
		setApplyLeaveMenu(state);
	};

	return (
		<Drawer anchor="right" open={applyLeaveMenu} onClose={toggleDrawer(false)}>
			<Box sx={{ width: 400, padding: 3, position: "relative" }}>
				{/* Cancel Icon */}
				<IconButton
					onClick={toggleDrawer(false)}
					sx={{ position: "absolute", top: 8, right: 8 }}
				>
					<CloseIcon />
				</IconButton>

				<Typography variant="h6" gutterBottom>
					Apply for Leave
				</Typography>

				<Formik
					initialValues={{
						startDate: "",
						endDate: "",
						leaveType: "",
						reason: "",
					}}
					validationSchema={validationSchema}
					onSubmit={async (values, { resetForm }) => {
						const start = new Date(values.startDate);
						const end = new Date(values.endDate);
						const numOfDays =
							Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
						console.log("Data", values);
						console.log("Sending to backend:", {
							...values,
							numOfDays,
						});
						try {
							const res = await axios.post(
								"http://localhost:5000/api/v1/leaves",
								{
									startDate: values.startDate,
									endDate: values.endDate,
									leaveType: values.leaveType,
									reason: values.reason,
									numOfDays: numOfDays,
								}
							);
							toggleDrawer();
							resetForm();
							console.log("✅ Success:", res.data);
						} catch (err) {
							console.error(
								"❌ Axios failed:",
								err.response?.data || err.message
							);
						}
						// try {
						// 	const response = await axios.post(
						// 		"http://localhost:5000/api/v1/leaves",
						// 		{
						// 			...values,
						// 			numOfDays,
						// 		}
						// 	);
						// 	console.log("Leave created:", response.data);
						// 	resetForm();
						// 	alert("Leave request submitted successfully");
						// } catch (error) {
						// 	console.error("Error submitting leave request:", error);
						// 	alert("Failed to submit leave request");
						// }
					}}
				>
					{({ values, errors, touched, handleChange }) => {
						const selectedLeave = leaveTypes.find(
							(l) => l.type === values.leaveType
						);
						const leaveBalance = selectedLeave ? selectedLeave.balance : "";

						// Calculate number of days
						let numberOfDays = "";
						const start = values.startDate ? new Date(values.startDate) : null;
						const end = values.endDate ? new Date(values.endDate) : null;
						if (start && end && end >= start) {
							const diffTime = end - start;
							numberOfDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
						}

						return (
							<Form>
								<TextField
									fullWidth
									label="Start Date"
									type="date"
									name="startDate"
									value={values.startDate}
									onChange={handleChange}
									error={touched.startDate && Boolean(errors.startDate)}
									helperText={touched.startDate && errors.startDate}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>

								<TextField
									fullWidth
									label="End Date"
									type="date"
									name="endDate"
									value={values.endDate}
									onChange={handleChange}
									error={touched.endDate && Boolean(errors.endDate)}
									helperText={touched.endDate && errors.endDate}
									margin="normal"
									InputLabelProps={{ shrink: true }}
								/>

								<TextField
									fullWidth
									select
									label="Leave Type"
									name="leaveType"
									value={values.leaveType}
									onChange={handleChange}
									error={touched.leaveType && Boolean(errors.leaveType)}
									helperText={touched.leaveType && errors.leaveType}
									margin="normal"
								>
									{leaveTypes.map((option) => (
										<MenuItem key={option.type} value={option.type}>
											{option.type}
										</MenuItem>
									))}
								</TextField>

								<TextField
									fullWidth
									label="Leave Balance"
									value={leaveBalance}
									InputProps={{ readOnly: true }}
									margin="normal"
								/>

								<TextField
									fullWidth
									required
									label="Number of Days"
									value={numberOfDays}
									InputProps={{ readOnly: true }}
									margin="normal"
								/>

								<TextField
									fullWidth
									multiline
									minRows={3}
									label="Reason"
									name="reason"
									value={values.reason}
									onChange={handleChange}
									error={touched.reason && Boolean(errors.reason)}
									helperText={touched.reason && errors.reason}
									margin="normal"
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
								{/* <Button type="submit" variant="contained" color="primary">
									Submit
								</Button> */}
							</Form>
						);
					}}
				</Formik>
			</Box>
		</Drawer>
	);
};
export default LeaveDrawerForm;
