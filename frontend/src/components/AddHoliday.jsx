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
	holidayID,
	handleClose,
	open,
}) {
	//
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [holidayData, setHolidayData] = React.useState({});
	const fetchHolidayData = async () => {
		try {
			const response = await axios.get(`${BASE_API}/holidays/${holidayID}`);
			console.log("Resp Data:", response.data);

			const data = response.data.holiday; // ✅ Get actual data
			setHolidayData(data);
			console.log("Holiday Data:", data);
		} catch (error) {
			console.error("Error fetching holiday data:", error);
		}
	};
	React.useEffect(() => {
		if (open && holidayID) {
			fetchHolidayData();
			console.log(holidayID);
		}
	}, [open]);
	const addHoliday = async (values, { resetForm }) => {
		try {
			const res = await axios.post(`${BASE_API}/holidays`, {
				holidayDate: values.holidayDate,
				holidayName: values.holidayName,
			});
			handleClose();
			resetForm();
			setReload((prev) => !prev);
			console.log("✅ Success:", res.data);
		} catch (err) {
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
			resetForm();
			console.log("✅ Success:", res.data);
		} catch (err) {
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
								holidayID && !isNaN(new Date(holidayData.holidayDate))
									? new Date(holidayData.holidayDate)
											.toISOString()
											.split("T")[0]
									: "",
							holidayName: holidayID ? holidayData.holidayName : "",
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
											onClick={setReload((prev) => !prev)}
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
				</DialogContent>
			</Dialog>
		</Box>
	);
}
