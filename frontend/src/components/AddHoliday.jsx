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
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
	holidayDate: Yup.date().required("Start date is required"),
	holidayName: Yup.string().required("Holiday Name is required"),
});
const BASE_API = process.env.BASE_URL || "http://localhost:5000/api/v1";
export default function AddHoliday({
	setReload,
	selectedHolidayData,
	holidayID,
	handleClose,
	open,
	setAlertOpen,
	setAlertStatus,
}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const addHoliday = async (values, { resetForm }) => {
		try {
			const res = await axios.post(`${BASE_API}/holidays`, {
				holidayDate: values.holidayDate,
				holidayName: values.holidayName,
			});
			handleClose();
			resetForm();
			setReload((prev) => !prev);
			setAlertStatus({
				type: "success",
				message: "Holiday added successfully!",
			});
			setAlertOpen(true);
			console.log("✅ Success:", res.data);
		} catch (err) {
			setAlertStatus({
				type: "error",
				message: "Failed to add holiday. Please try again.",
			});
			setAlertOpen(true);
			console.error("❌ Axios failed:", err.response?.data || err.message);
		}
	};
	const editHoliday = async (values, { resetForm }) => {
		try {
			const res = await axios.patch(`${BASE_API}/holidays/${holidayID}`, {
				holidayDate: values.holidayDate,
				holidayName: values.holidayName,
			});
			handleClose();
			setReload((prev) => !prev);
			setAlertOpen(true);
			setAlertStatus({
				type: "success",
				message: "Holiday updated successfully!",
			});
			resetForm();
			console.log("✅ Success:", res.data);
		} catch (err) {
			setAlertOpen(true);
			setAlertStatus({
				type: "error",
				message: "Failed to update holiday. Please try again.",
			});
			console.error("❌ Axios failed:", err.response?.data || err.message);
		}
	};

	return (
		<Box sx={{ display: "flex", height: "100%" }}>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{holidayID ? "Edit Holiday" : "Add Holiday"}
				</DialogTitle>
				<DialogContent>
					<Formik
						initialValues={{
							holidayDate:
								selectedHolidayData &&
								!isNaN(new Date(selectedHolidayData.holidayDate))
									? new Date(selectedHolidayData.holidayDate)
											.toISOString()
											.split("T")[0]
									: "",
							holidayName: selectedHolidayData
								? selectedHolidayData.holidayName
								: "",
						}}
						validationSchema={validationSchema}
						onSubmit={holidayID ? editHoliday : addHoliday}
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
											onClick={setReload((prev) => !prev)}
										>
											Submit
										</Button>
									</Box>
								</Form>
							);
						}}
					</Formik>
				</DialogContent>
			</Dialog>
		</Box>
	);
}
