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
import axios from "axios";

const validationSchema = Yup.object().shape({
	holidayDate: Yup.date().required("Start date is required"),
	holidayName: Yup.string().required("Reason is required"),
});

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
		<Box sx={{ display: "flex", height: "100%" }}>
			<Button
				variant="contained"
				onClick={handleClickOpen}
				sx={{ height: "100%" }}
			>
				Add Holiday
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
								holidayDate: "",
								holidayName: "",
							}}
							validationSchema={validationSchema}
							onSubmit={async (values, { resetForm }) => {
								try {
									const res = await axios.post(
										"http://localhost:5000/api/v1/holidays",
										{
											holidayDate: values.holidayDate,
											holidayName: values.holidayName,
										}
									);
									handleClose();
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
											label="Holiday Name"
											value={values.holidayName}
											onChange={handleChange}
											name="holidayName"
											// InputProps={{ readOnly: true }}
											margin="normal"
											required
											error={touched.holidayDate && Boolean(errors.holidayDate)}
											helperText={touched.holidayDate && errors.holidayDate}
										/>
										<TextField
											fullWidth
											label="Date"
											type="date"
											name="holidayDate"
											value={values.holidayDate}
											onChange={handleChange}
											required
											error={touched.holidayDate && Boolean(errors.holidayDate)}
											helperText={touched.holidayDate && errors.holidayDate}
											margin="normal"
											InputLabelProps={{ shrink: true }}
										/>

										<Box sx={{ display: "flex", gap: 1 }}>
											<Button
												fullWidth
												// type="submit"
												variant="contained"
												color="background.default"
												sx={{ mt: 2, boxShadow: 4 }}
												onClick={handleClose}
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
		</Box>
	);
}
