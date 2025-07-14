import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
const BASE_API = process.env.BASE_URL || "http://localhost:5000/api/v1";
export default function DeleteDialog({
	openDeleteDialog,
	setOpenDeleteDialog,
	setReload,
	holidayID,
	type,
	setAlertStatus,
}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const deleteHoliday = async () => {
		try {
			const response = await axios.delete(`${BASE_API}/holidays/${holidayID}`);
			if (response.status === 200) {
				setReload((prev) => !prev);
				setOpenDeleteDialog(false);
				console.log("✅ Holiday deleted successfully:", response.data);
				setAlertStatus({
					type: "success",
					message: "Holiday deleted successfully!",
				});
			} else {
				console.error("❌ Failed to delete holiday:", response.data);
				setAlertStatus({
					type: "error",
					message: "Failed to delete holiday. Please try again.",
				});
			}
		} catch (error) {
			console.error("Error deleting holiday:", error);
			setAlertStatus({
				type: "error",
				message: "Failed to delete holiday. Please try again.",
			});
		}
	};

	const handleClose = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<React.Fragment>
			<Dialog
				fullScreen={fullScreen}
				open={openDeleteDialog}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Are you sure you want to delete this ${type}? This action cannot be
						undone.`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} variant="outlined">
						Cancel
					</Button>
					<Button
						onClick={() => {
							deleteHoliday();
							handleClose();
						}}
						autoFocus
						variant="contained"
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
