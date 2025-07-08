import * as React from "react";
import {
	Drawer,
	IconButton,
	Typography,
	Box,
	TextField,
	MenuItem,
	Button,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMain } from "../context/MainContext";
import axios from "axios";

const validationSchema = Yup.object().shape({
	startDate: Yup.date().required("Start date is required"),
	endDate: Yup.date()
		.required("End date is required")
		.min(Yup.ref("startDate"), "End date can't be before start date"),
	leaveType: Yup.string().required("Leave type is required"),
	reason: Yup.string().required("Reason is required"),
});
const leaveTypes = [
	{ type: "Annual Leave", balance: 12 },
	{ type: "Casual Leave", balance: 12 },
	{ type: "Sick Leave", balance: 12 },
];
export default function AddHoliday() {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={handleClickOpen}>
				Open responsive dialog
			</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Add Holiday"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Formik
							initialValues={{
								startDate: "",
								endDate: "",
								leaveType: "",
								reason: "",
							}}
							validationSchema={validationSchema}
							onSubmit={
								() => console.log("Helloo")
								// async (values, { resetForm }) => {
								// 	const start = new Date(values.startDate);
								// 	const end = new Date(values.endDate);
								// 	const numOfDays =
								// 		Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
								// 	console.log("Data", values);
								// 	console.log("Sending to backend:", {
								// 		...values,
								// 		numOfDays,
								// 	});
								// 	try {
								// 		const res = await axios.post(
								// 			"http://localhost:5000/api/v1/leaves",
								// 			{
								// 				startDate: "2025-07-11",
								// 				endDate: "2025-07-12",
								// 				leaveType: "Annual Leave",
								// 				reason: "Test reason",
								// 				numOfDays: 2,
								// 			}
								// 		);
								// 		console.log("✅ Success:", res.data);
								// 	} catch (err) {
								// 		console.error(
								// 			"❌ Axios failed:",
								// 			err.response?.data || err.message
								// 		);
								// 	}
								// }
							}
						>
							{({ values, errors, touched, handleChange }) => {
								return (
									<Form>
										<TextField
											fullWidth
											label="Date"
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
											label="Holiday Name"
											value={0}
											// InputProps={{ readOnly: true }}
											margin="normal"
										/>
										<Box sx={{ display: "flex", gap: 1 }}>
											<Button
												fullWidth
												// type="submit"
												variant="contained"
												color="background.default"
												sx={{ mt: 2, boxShadow: 4 }}
											>
												Cancel
											</Button>
											<Button
												fullWidth
												type="submit"
												variant="contained"
												color="primary"
												sx={{ mt: 2 }}
											>
												Submit
											</Button>
										</Box>
										{/* <Button type="submit" variant="contained" color="primary">
                                                            Submit
                                                        </Button> */}
									</Form>
								);
							}}
						</Formik>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	);
}
